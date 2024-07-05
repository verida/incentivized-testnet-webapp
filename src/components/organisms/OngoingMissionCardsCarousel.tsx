import React, { useMemo } from "react";

import { OngoingMissionCard } from "~/components/organisms/OngoingMissionCard";
import { Mission } from "~/features/missions";

const MAX_NB_ITEMS = 2;

export type OngoingMissionCardsCarouselProps = {
  missions: Mission[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const OngoingMissionCardsCarousel: React.FC<
  OngoingMissionCardsCarouselProps
> = (props) => {
  const { missions, ...divProps } = props;

  const displayedItems = useMemo(
    () => missions.slice(0, MAX_NB_ITEMS),
    [missions]
  );

  return (
    <div {...divProps}>
      <ul className="overflow-x-auto scroll-smooth snap-x snap-proximity px-6 flex flex-row gap-4 sm:gap-8 items-stretch">
        {displayedItems.map((mission) => (
          <li
            key={mission.id}
            className="flex-1 snap-center min-w-[calc(375px_-_3rem)] w-screen max-w-[calc((_1216px_-_2rem_)_/_2)]"
            // min-w-[calc(375px_-_3rem)]: 1 card filling the screen width
            // considering a 375px screen width reference - 2 x 1.5rem padding
            // max-w-[calc((_1216px_-_2rem_)_/_2)]: based on 2 cards filling
            // the wide layout screen considering a 1216px container width
            // reference - gap of 2rem
          >
            <OngoingMissionCard mission={mission} />
          </li>
        ))}
      </ul>
    </div>
  );
};
