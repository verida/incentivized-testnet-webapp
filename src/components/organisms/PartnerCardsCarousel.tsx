import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import {
  ButtonLinkBase,
  Icon,
  IconButton,
  Typography,
} from "~/components/atoms";
import { PartnerListItem } from "~/components/molecules";
import { Partner } from "~/features/partners";

const MAX_NB_ITEMS = 6;

export type PartnerCardsCarouselProps = {
  partners: Partner[];
  title?: string;
  limit?: number;
  navButton?: boolean;
  viewAllButton?: boolean;
  viewAllLink?: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const PartnerCardsCarousel: React.FC<PartnerCardsCarouselProps> = (
  props
) => {
  const {
    partners,
    title,
    limit = MAX_NB_ITEMS,
    navButton,
    viewAllButton,
    viewAllLink,
    ...asideProps
  } = props;

  const i18n = useIntl();

  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  const displayedItems = partners.slice(
    currentScrollIndex,
    currentScrollIndex + limit
  );

  const viewAllLabel = i18n.formatMessage({
    id: "PartnerCardsCarousel.viewAllLabel",
    description: "Label for View All button",
    defaultMessage: "View All",
  });

  return (
    <div {...asideProps}>
      <div className="flex mb-6 justify-between">
        <Typography variant={"heading-m"}>{title}</Typography>
        <div className="hidden lg:flex gap-3">
          {navButton ? (
            <>
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
                disabled={currentScrollIndex >= partners.length - MAX_NB_ITEMS}
                onClick={() => setCurrentScrollIndex((prev) => prev + 1)}
              />
            </>
          ) : null}
          {viewAllButton && viewAllLink ? (
            <ButtonLinkBase href={viewAllLink}>{viewAllLabel}</ButtonLinkBase>
          ) : null}
        </div>
      </div>
      <ul className="flex lg:hidden flex-row overflow-x-scroll scroll-smooth snap-x snap-proximity gap-4 items-stretch">
        {partners.map((partner) => (
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
      <ul className="hidden lg:flex flex-row scroll-smooth snap-x snap-proximity gap-8 items-stretch">
        {displayedItems.map((partner) => (
          <li key={partner.id} className="flex-1 snap-center max-w-[176px]">
            <Link to={`/partners/${partner.id}`}>
              <PartnerListItem partner={partner} small />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
