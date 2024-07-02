import React from "react";
import { useIntl } from "react-intl";

import { ButtonLink } from "~/components/atoms";
import { PartnerCardsCarousel } from "~/components/organisms/PartnerCardsCarousel";
import { HomeSectionWrapper } from "~/components/templates";
import { partners } from "~/features/partners";

export type PartnersHomeSectionProps = Omit<
  React.ComponentPropsWithRef<typeof HomeSectionWrapper>,
  "title" | "children"
>;

export const PartnersHomeSection: React.FC<PartnersHomeSectionProps> = (
  props
) => {
  const { ...wrapperProps } = props;

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "PartnersHomeSection.title",
    defaultMessage: "Partners",
    description: "Title of the Partners section on the home page",
  });

  const viewAllPartnersButtonLabel = i18n.formatMessage({
    id: "PartnersHomeSection.viewAllPartnersButtonLabel",
    defaultMessage: "View All",
    description: "Label of the button to view all partners",
  });

  return (
    <HomeSectionWrapper
      {...wrapperProps}
      title={title}
      headerLeft={
        <ButtonLink href="/partners" internal>
          {viewAllPartnersButtonLabel}
        </ButtonLink>
      }
    >
      <PartnerCardsCarousel partners={partners} />
    </HomeSectionWrapper>
  );
};
