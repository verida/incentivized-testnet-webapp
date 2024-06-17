import { useMemo } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { MissionProgressBar } from "~/components/molecules";
import { MissionCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { useActivity } from "~/features/activity";
import {
  getMissionById,
  isOnboardingMission as isOnboardingMissionFunc,
} from "~/features/missions";

export const MissionPage: React.FC = () => {
  // Extract mission id from url path
  const { missionId = "" } = useParams();

  // Check if current mission is onboarding mission
  const mission = getMissionById(missionId);
  const isOnboardingMission = isOnboardingMissionFunc(missionId);

  const {
    activities: allActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

  const missionActivities = allActivities.filter(
    (activity) => activity.missionId === mission?.id && activity.visible
  );

  const activityStatuses = useMemo(() => {
    return missionActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [missionActivities, getUserActivity]);

  const missionTotalPoints = missionActivities.reduce(
    (totalNbPoints, activity) => totalNbPoints + activity.points,
    0
  );

  const i18n = useIntl();

  const emptry = i18n.formatMessage({
    id: "MissionPage.emptyMessage",
    description: "Message when mission doesn't exist",
    defaultMessage: "No data",
  });

  return (
    <PageLayout
      hideReportIssueButton
      displayExploreMoreMissionsSection={!isOnboardingMission}
    >
      {mission ? (
        <div className="flex flex-col w-full max-w-mission-page mx-auto">
          <div className="w-full justify-center max-w-mission mx-auto">
            <MissionCard
              activities={missionActivities}
              mission={mission}
              showDescription={true}
              hideButtonLink={true}
              showPoints={true}
              showPartners={true}
            />
          </div>
          <div className="sticky bottom-6 left-0 right-0 max-w-mission-page-progress mx-auto w-full mt-11 p-4 lg:px-6 lg:py-4 rounded-2xl backdrop-blur-xl border-border-progress border bg-progressBg">
            <MissionProgressBar
              variant="base"
              className="gap-3 lg:gap-6 flex flex-col w-full"
              isLoading={isLoadingUserActivities}
              statuses={activityStatuses}
              point={missionTotalPoints}
              showPoint={true}
              showLabel={true}
            />
          </div>
        </div>
      ) : (
        <>
          {/* TODO: Rework the not found state */}
          <div className="">{emptry}</div>
        </>
      )}
    </PageLayout>
  );
};
