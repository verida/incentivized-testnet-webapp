import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ButtonLinkBase, Typography } from "~/components/atoms";
import { PartnerListItem } from "~/components/molecules";
import { Partner } from "~/features/partners";

const MAX_NB_ITEMS = 6;

export type PartnerCardsCarouselProps = {
  partners: Partner[];
  title?: string;
  viewAllButton?: boolean;
  viewAllLink?: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const PartnerCardsCarousel: React.FC<PartnerCardsCarouselProps> = (
  props
) => {
  const { partners, title, viewAllButton, viewAllLink, ...asideProps } = props;

  const i18n = useIntl();

  const displayedItems = partners.slice(0, MAX_NB_ITEMS);

  const viewAllLabel = i18n.formatMessage({
    id: "PartnerCardsCarousel.viewAllLabel",
    description: "Label for View All button",
    defaultMessage: "View All",
  });

  return (
    <div {...asideProps}>
      {title ? (
        <div className="flex pl-6 pr-2 lg:pr-6 mb-6 justify-between items-center">
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
        {displayedItems.map((partner) => (
          <li
            key={partner.id}
            className="flex-1 snap-center min-w-[176px] w-screen max-w-[176px]"
          >
            <Link to={`/partners/${partner.id}`}>
              <PartnerListItem partner={partner} small />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
