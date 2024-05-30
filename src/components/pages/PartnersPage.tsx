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
    <PageLayout
      hideAppTitle={true}
      title={title}
      showBackButton={true}
      className="w-full"
    >
      <div className="mt-8 md:mt-16 flex gap-[15px] md:gap-8 flex-wrap max-w-[1200px] mx-auto w-full">
        {partners.map((partner, index) => (
          <PartnerListItem partner={partner} key={index} />
        ))}
      </div>
    </PageLayout>
  );
};
