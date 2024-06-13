import React from "react";
import { useIntl } from "react-intl";

import { PartnerListItem } from "~/components/molecules";
import { PageLayout } from "~/components/templates";
import { partners } from "~/features/partners";

export const PartnersPage: React.FC = () => {
  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "PartnersPage.title",
    description: "Title of the Partners page",
    defaultMessage: "Partners",
  });

  // TODO: Implement the case where there are no partners

  return (
    <PageLayout title={title}>
      <div className="grid gap-4 lg:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {[...partners, ...partners, ...partners, ...partners].map(
          (partner, index) => (
            <PartnerListItem
              partner={partner}
              key={index} // TODO: Use the partner.id once the list has no duplicates
            />
          )
        )}
      </div>
    </PageLayout>
  );
};
