import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { MissionCard } from "~/components/organisms";
import { PartnerInfoCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { usePartner } from "~/features/activity";

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

  return (
    <PageLayout hideAppTitle={true} showBackButton={true} className="w-full">
      {partner ? (
        <div className="flex flex-col lg:flex-row gap-10 w-full justify-center mt-10 lg:mt-0">
          <PartnerInfoCard
            partner={partner}
            missions={missions}
            activities={activities}
          />
          <div className={"grid grid-cols-1 lg:gap-8"}>
            {missions.map((mission, index) => (
              <MissionCard
                mission={mission}
                activities={activities.filter(
                  (activity) => activity.missionId === mission.id
                )}
                key={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="">{emptry}</div>
      )}
    </PageLayout>
  );
};
