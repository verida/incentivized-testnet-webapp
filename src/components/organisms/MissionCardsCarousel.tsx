import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ButtonLinkBase, Typography } from "~/components/atoms";
import { MissionCard } from "~/components/organisms";
import { Mission } from "~/features/missions";

const MAX_NB_ITEMS = 3;

export type MissionCardsCarouselProps = {
  missions: Mission[];
  title?: string;
  viewAllButton?: boolean;
  viewAllLink?: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCardsCarousel: React.FC<MissionCardsCarouselProps> = (
  props
) => {
  const { missions, title, viewAllButton, viewAllLink, ...asideProps } = props;

  const i18n = useIntl();

  const displayedItems = missions.slice(0, MAX_NB_ITEMS);

  const viewAllLabel = i18n.formatMessage({
    id: "MissionCardsCarousel.viewAllLabel",
    description: "Label for View All button",
    defaultMessage: "View All",
  });

  return (
    <div {...asideProps}>
      {title ? (
        <div className="flex ml-6 mb-6 justify-between">
          <Typography variant={"heading-m"}>{title}</Typography>
          {viewAllButton && viewAllLink ? (
            <ButtonLinkBase href={viewAllLink} internal className="py-3.5">
              <Typography variant={"base-s"} className="!font-semibold">
                {viewAllLabel}
              </Typography>
            </ButtonLinkBase>
          ) : null}
        </div>
      ) : null}
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
