import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import usePartner from "~/features/activity/hooks/usePartner";

import PartnerMissionCard from "../organisms/PartnerMissionCard";
import PartnerOverviewCard from "../organisms/PartnerOverviewCard";

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
  console.log("partnerId: ", partnerId, partner, activities);

  return partner ? (
    <div className="flex pt-5 gap-2">
      <PartnerOverviewCard
        partner={partner}
        missions={missions}
        activities={activities}
      />
      <div className="">
        <PartnerMissionCard mission={missions[0]} />
      </div>
    </div>
  ) : (
    <div className="">{emptry}</div>
  );
};
