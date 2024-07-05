import React from "react";
import { defineMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { EmptyListMessage } from "~/components/molecules";
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

  const partnerEntity = defineMessage({
    id: "PartnersPage.partnerEntity",
    description: "Entity name for the empty partners list in the partners page",
    defaultMessage: "partners",
  });

  if (partners.length === 0) {
    return (
      <PageLayout title={title} contentClassName="flex flex-col">
        <div className="flex-1 flex flex-col w-full justify-center items-center">
          <EmptyListMessage entity={partnerEntity} />
        </div>
      </PageLayout>
    );
  }

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
