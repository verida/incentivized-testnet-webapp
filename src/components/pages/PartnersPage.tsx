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
      <div className="mt-11 md:mt-16 grid gap-[15px] lg:gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-[327px] sm:max-w-[450px] md:max-w-[700px] lg:max-w-[1000px] xl:max-w-[1216px] mx-auto w-full text-center">
        {[...partners, ...partners, ...partners, ...partners].map(
          (partner, index) => (
            <PartnerListItem partner={partner} key={index} />
          )
        )}
      </div>
    </PageLayout>
  );
};
