import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Icon, IconButton } from "~/components/atoms";
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

  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  const displayedItems = missions.slice(
    currentScrollIndex,
    currentScrollIndex + MAX_NB_ITEMS
  );

  return (
    <div {...asideProps}>
      <div className="mb-6">
        <div className="hidden lg:flex gap-3 justify-end">
          <IconButton
            variant="outlined"
            color="default"
            className="backdrop-blur-sm"
            icon={<Icon type="arrow-left" size={18} />}
            disabled={currentScrollIndex <= 0}
            onClick={() => setCurrentScrollIndex((prev) => prev - 1)}
          />
          <IconButton
            variant="outlined"
            color="default"
            className="backdrop-blur-sm"
            icon={<Icon type="arrow-right" size={18} />}
            disabled={currentScrollIndex >= missions.length - MAX_NB_ITEMS}
            onClick={() => setCurrentScrollIndex((prev) => prev + 1)}
          />
        </div>
      </div>
      <ul className="flex lg:hidden flex-row overflow-x-scroll scroll-smooth snap-x snap-proximity gap-4 items-stretch">
        {missions.map((mission) => (
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
      <ul className="hidden lg:flex flex-row scroll-smooth snap-x snap-proximity gap-8 items-stretch">
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
