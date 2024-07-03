import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { PartnerCard } from "~/components/organisms";
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
      <ul className="grid gap-4 lg:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {partners.map((partner) => (
          <li key={partner.id}>
            <Link to={`/partners/${partner.id}`}>
              <PartnerCard
                partner={partner}
                className="hover:border-border-hover hover:bg-background-extra-light"
              />
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
};
