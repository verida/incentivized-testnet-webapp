import { useIntl } from "react-intl";

import { PageLayout } from "~/components/templates";

export const PartnersPage = () => {
  const i18n = useIntl();
  const header = i18n.formatMessage({
    id: "PartnersPage.id",
    description: "Description",
    defaultMessage: "Partners",
  });

  return (
    <PageLayout title={header}>
      <span className=""></span>
    </PageLayout>
  );
};
