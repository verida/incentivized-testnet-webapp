import React from "react";
import { Link } from "react-router-dom";

import { MissionCard } from "~/components/organisms";
import { Mission } from "~/features/missions";

const MAX_NB_ITEMS = 3;

export type MissionCardsCarouselProps = {
  missions: Mission[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCardsCarousel: React.FC<MissionCardsCarouselProps> = (
  props
) => {
  const { missions, ...asideProps } = props;

  const displayedItems = missions.slice(0, MAX_NB_ITEMS);

  if (displayedItems.length === 0) {
    return null;
  }

  return (
    <div {...asideProps}>
      <ul className="overflow-x-auto scroll-smooth snap-x snap-proximity px-6 flex flex-row gap-4 sm:gap-8 items-stretch">
        {displayedItems.map((mission) => (
          <li
            key={mission.id}
            className="flex-1 snap-center min-w-[327px] w-screen max-w-[384px]"
          >
            <Link to={`/missions/${mission.id}`}>
              <MissionCard
                mission={mission}
                className="hover:border-border-hover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
