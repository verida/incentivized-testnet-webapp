import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { MissionCard } from "~/components/organisms";
import { Mission } from "~/features/missions";

// The layout (particularly the width of each item) is based on a max number of
// items of 3. Careful if chaging this constants as it may break the layout.
const MAX_NB_ITEMS = 3;

export type MissionCardsCarouselProps = {
  missions: Mission[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCardsCarousel: React.FC<MissionCardsCarouselProps> = (
  props
) => {
  const { missions, ...asideProps } = props;

  const displayedMissions = useMemo(() => {
    return missions.slice(0, MAX_NB_ITEMS);
  }, [missions]);

  if (displayedMissions.length === 0) {
    return null;
  }

  return (
    <div {...asideProps}>
      <ul className="overflow-x-auto scroll-smooth snap-x snap-proximity px-6 flex flex-row gap-4 sm:gap-8 items-stretch">
        {displayedMissions.map((mission) => (
          <li
            key={mission.id}
            className="flex-1 snap-center min-w-[calc(375px_-_3rem)] w-screen max-w-[calc(1216px_-_4rem)]"
            // min-w-[calc(375px_-_3rem)]: 1 card filling the screen width
            // considering a 375px screen width reference - 2 x 1.5rem padding
            // max-w-[calc(1216px_-_4rem)]: 3 cards filling the wide screen
            // considering a 1216px screen width reference - 2 x 2rem gap
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
