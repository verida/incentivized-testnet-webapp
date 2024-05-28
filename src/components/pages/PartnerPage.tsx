import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { PartnerMissionCard } from "~/components/organisms";
import { PartnerOverviewCard } from "~/components/organisms";
import usePartner from "~/features/activity/hooks/usePartner";

export const PartnerPage = () => {
  const i18n = useIntl();
  const emptry = i18n.formatMessage({
    id: "PartnerPage.empty",
    description: "Description",
    defaultMessage: "No data",
  });

  // Extract partner id from url path
  const location = useLocation();
  const partnerId = location.pathname?.split("/")?.[2];

  // Extract partner and activities from partner id
  const { partner, activities, missions } = usePartner(partnerId);

  return partner ? (
    <div className="flex pt-5 gap-5 md:gap-10 w-full justify-center max-w-screen-xl">
      <PartnerOverviewCard
        partner={partner}
        missions={missions}
        activities={activities}
      />
      <div
        className={twMerge(
          "grid gap-2",
          missions.length > 1 ? "grid-cols-2" : "grid-cols-1"
        )}
      >
        {missions.map((mission, index) => (
          <PartnerMissionCard mission={mission} key={index} />
        ))}
      </div>
    </div>
  ) : (
    <div className="">{emptry}</div>
  );
};
