import { useMemo } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { MissionBottomBar, MissionSection } from "~/components/organisms";
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
        <div className="flex flex-col items-center gap-6 lg:gap-11">
          <div className="max-w-[calc(1264px_-_16rem)]">
            <MissionSection
              activities={missionActivities}
              mission={mission}
              displayGoToMissionButton
            />
          </div>
          <div className="sticky bottom-6 max-w-[calc(1264px_-_12rem)] w-full">
            <MissionBottomBar
              statuses={activityStatuses}
              points={missionTotalPoints}
              isLoading={isLoadingUserActivities}
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
