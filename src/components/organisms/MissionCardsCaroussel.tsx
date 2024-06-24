import React from "react";
import { Link } from "react-router-dom";

import { MissionCard } from "~/components/organisms";
import { Mission } from "~/features/missions";

const MAX_NB_ITEMS = 3;

export type MissionCardsCarousselProps = {
  missions: Mission[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCardsCaroussel: React.FC<MissionCardsCarousselProps> = (
  props
) => {
  const { missions, ...asideProps } = props;

  const displayedItems = missions.slice(0, MAX_NB_ITEMS);

  return (
    <div {...asideProps}>
      <ul className="overflow-x-scroll scroll-smooth snap-x snap-proximity px-4 sm:px-6 flex flex-row gap-4 sm:gap-8 items-stretch">
        {displayedItems.map((mission) => (
          <li
            key={mission.id}
            className="flex-1 snap-center min-w-[312px] w-screen max-w-[384px]"
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
