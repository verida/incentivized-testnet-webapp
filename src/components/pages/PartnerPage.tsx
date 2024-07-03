import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { MissionSection, PartnerInfoCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { usePartner } from "~/features/partners";

export const PartnerPage: React.FC = () => {
  const { partnerId = "" } = useParams();
  const { partner, activities, missions } = usePartner(partnerId);

  const i18n = useIntl();

  const missionActivityListMessage = i18n.formatMessage(
    {
      id: "PartnerPage.missionActivityListMessage",
      description:
        "Message displayed above the activity list of each mission section for a given partner",
      defaultMessage: "{partnerName} activities:",
    },
    {
      partnerName: partner?.name || "",
    }
  );

  // TODO: Rework the not found state of the Partner page
  const emptry = i18n.formatMessage({
    id: "PartnerPage.empty",
    description: "Description",
    defaultMessage: "No data",
  });

  // TODO: Implement the case there is no missions to display

  return (
    <PageLayout title={partner?.name}>
      {partner ? (
        <div className="flex flex-col justify-start lg:flex-row gap-10">
          <PartnerInfoCard
            partner={partner}
            nbActivities={activities.length}
            className="max-lg:w-full"
          />
          <ul className={"flex-grow grid grid-cols-1 gap-8"}>
            {missions.map((mission) => (
              <li key={mission.id}>
                <MissionSection
                  mission={mission}
                  activities={activities.filter(
                    (activity) => activity.missionId === mission.id
                  )}
                  activityListMessage={missionActivityListMessage}
                  displayGoToMissionButton
                  hidePartnersOnActivities
                  hideTotalMissionXpPoints
                  hideDescription
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="">{emptry}</div>
      )}
    </PageLayout>
  );
};
