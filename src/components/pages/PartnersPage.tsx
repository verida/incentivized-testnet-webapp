import { ReactComponent as VeridaNetworkLogo } from "assets/images/verida_network_logo_with_text_white.svg";
import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { NotFoundMessageBox } from "~/components/molecules";
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

  const emptyPartnerMessage = i18n.formatMessage({
    id: "PartnersPage.emptyPartnerMessage",
    description: "Message when there are no partners",
    defaultMessage: "There are currently no partners to display",
  });

  const emptyPartnerDescription = i18n.formatMessage({
    id: "PartnersPage.emptyPartnerDescription",
    description: "Description when there are no partners",
    defaultMessage:
      "It looks like there are no partners available at the moment. Please check back later.",
  });

  return (
    <PageLayout title={title}>
      {partners.length ? (
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
      ) : (
        <div className="flex flex-col h-[40vh] justify-center items-center">
          <NotFoundMessageBox
            logo={<VeridaNetworkLogo />}
            title={emptyPartnerMessage}
            description={emptyPartnerDescription}
          />
        </div>
      )}
    </PageLayout>
  );
};
