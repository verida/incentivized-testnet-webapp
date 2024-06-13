import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import { MissionCard } from "~/components/organisms";
import { PartnerInfoCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { usePartner } from "~/features/partners";

export const PartnerPage: React.FC = () => {
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
    <PageLayout>
      {partner ? (
        <div className="flex flex-col lg:flex-row gap-10 w-full justify-center">
          <PartnerInfoCard partner={partner} activities={activities} />
          <div className={"grid grid-cols-1 lg:gap-8"}>
            {missions.map((mission, index) => (
              <MissionCard
                mission={mission}
                activities={activities.filter(
                  (activity) => activity.missionId === mission.id
                )}
                showStartButton={true}
                showPartners={false}
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
