import { useIntl } from "react-intl";

import { PartnerListItem } from "~/components/molecules";
import { PageLayout } from "~/components/templates";
import { partners } from "~/features/activity/partners";

export const PartnersPage = () => {
  const i18n = useIntl();
  const title = i18n.formatMessage({
    id: "PartnersPage.title",
    description: "Description of title",
    defaultMessage: "Partners",
  });
  return (
    <PageLayout title={title}>
      <div className="grid gap-4 lg:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {[...partners, ...partners, ...partners, ...partners].map(
          (partner, index) => (
            <PartnerListItem partner={partner} key={index} />
          )
        )}
      </div>
    </PageLayout>
  );
};
