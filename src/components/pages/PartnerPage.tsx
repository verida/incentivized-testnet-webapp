import { ReactComponent as VeridaNetworkLogo } from "assets/images/verida_network_logo_with_text_white.svg";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { NotFoundMessageBox } from "~/components/molecules";
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

  const partnerNotFoundMessage = i18n.formatMessage({
    id: "PartnerPage.notFoundMessage",
    description: "Message when partner doesn't exist",
    defaultMessage: "Partner Not Found",
  });

  const partnerNotFoundDescription = i18n.formatMessage({
    id: "PartnerPage.notFoundDescription",
    description: "Description when partner doesn't exist",
    defaultMessage:
      "The partner ID you entered does not match any existing partner. Please check the partner ID and try again.",
  });

  const emptyMissionMessage = i18n.formatMessage({
    id: "PartnerPage.emptyMissionMessage",
    description: "Message when there are no missions for a partner",
    defaultMessage: "There are currently no missions to display",
  });

  const emptyMissionDescription = i18n.formatMessage({
    id: "PartnerPage.emptyMissionDescription",
    description: "Description when there are no missions for a partner",
    defaultMessage:
      "It looks like there are no missions available at the moment. Please check back later.",
  });

  if (!partner) {
    return (
      <PageLayout hideReportIssueButton>
        <div className="flex flex-col h-[40vh] justify-center items-center">
          <NotFoundMessageBox
            logo={<VeridaNetworkLogo />}
            title={partnerNotFoundMessage}
            description={partnerNotFoundDescription}
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
            <NotFoundMessageBox
              logo={<VeridaNetworkLogo />}
              title={emptyMissionMessage}
              description={emptyMissionDescription}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};
