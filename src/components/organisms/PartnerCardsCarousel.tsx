import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { PartnerListItem } from "~/components/molecules";
import { Partner } from "~/features/partners";

// The layout (particularly the width of each item) is based on a max number of
// items of 6. Careful if changing this constants as it may break the layout.
const MAX_NB_ITEMS = 6;

export type PartnerCardsCarouselProps = {
  partners: Partner[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const PartnerCardsCarousel: React.FC<PartnerCardsCarouselProps> = (
  props
) => {
  const { partners, ...divProps } = props;

  const displayedPartners = useMemo(
    () => partners.slice(0, MAX_NB_ITEMS),
    [partners]
  );

  if (displayedPartners.length === 0) {
    return null;
  }

  return (
    <div {...divProps}>
      <ul className="overflow-x-auto scroll-smooth snap-x snap-proximity px-6 flex flex-row gap-4 sm:gap-8 items-stretch">
        {displayedPartners.map((partner) => (
          <li
            key={partner.id}
            className="flex-1 snap-start w-[calc((_1216px_-_10rem_)_/_6)]"
            // w-[calc((_1216px_-_20rem_)_/_6)]: based on 6 cards filling
            // the wide layout screen, considering a 1216px container width
            // reference - gap of 2rem. Then keep this size constant.
          >
            <Link to={`/partners/${partner.id}`}>
              <PartnerListItem
                partner={partner}
                className="hover:border-border-hover hover:bg-background-extra-light"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
