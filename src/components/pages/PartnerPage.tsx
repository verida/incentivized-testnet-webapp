import { ReactComponent as VeridaNetworkLogo } from "assets/images/verida_network_logo_with_text_white.svg";
import { defineMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { EmptyListMessage, NotFoundMessage } from "~/components/molecules";
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

  const partnerEntity = defineMessage({
    id: "PartnerPage.partnerEntity",
    description: "Entity for not found message",
    defaultMessage: "Partner",
  });

  const missionEntity = defineMessage({
    id: "PartnerPage.missionEntity",
    description: "Entity for empty list",
    defaultMessage: "missions",
  });

  if (!partner) {
    return (
      <PageLayout>
        <div className="flex flex-col h-[40vh] justify-center items-center">
          <NotFoundMessage
            logo={<VeridaNetworkLogo />}
            entity={partnerEntity}
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={partner?.name}>
      <div className="flex flex-col justify-start lg:flex-row gap-10">
        <PartnerInfoCard
          partner={partner}
          nbActivities={activities.length}
          className="max-lg:w-full"
        />
        {missions.length ? (
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
        ) : (
          <div className="flex flex-col w-full h-[40vh] justify-center items-center">
            <EmptyListMessage
              logo={<VeridaNetworkLogo />}
              entity={missionEntity}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};
