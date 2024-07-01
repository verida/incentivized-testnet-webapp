import { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { MissionBottomBar, MissionSection } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { isMissionCompleted, useActivity } from "~/features/activity";
import {
  Mission,
  getMissionById,
  isOnboardingMission as isOnboardingMissionFunc,
} from "~/features/missions";
import { useVerida } from "~/features/verida";

export const MissionPage: React.FC = () => {
  // Extract mission id from url path
  const { missionId = "" } = useParams();

  // Check if current mission is onboarding mission
  const mission = getMissionById(missionId);
  const isOnboardingMission = isOnboardingMissionFunc(missionId);

  const { isConnected, isConnecting } = useVerida();

  const {
    activities: allActivities,
    userActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

  const missionActivities = useMemo(
    () =>
      allActivities.filter(
        (activity) => activity.missionId === mission?.id && activity.visible
      ),
    [allActivities, mission]
  );

  const missionTotalXpPoints = useMemo(
    () =>
      missionActivities.reduce(
        (totalNbPoints, activity) => totalNbPoints + activity.points,
        0
      ),
    [missionActivities]
  );

  const activityStatuses = useMemo(() => {
    return missionActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [missionActivities, getUserActivity]);

  const exploreMoreMissionsPredicate = useCallback(
    (mission: Mission) =>
      // Filter out current mission
      mission.id !== missionId &&
      // Filter out completed missions
      !isMissionCompleted(allActivities, userActivities, mission.id),
    [missionId, allActivities, userActivities]
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
      exploreMoreMissionsFilterPredicate={exploreMoreMissionsPredicate}
    >
      {mission ? (
        <div className="flex flex-col items-center gap-6 lg:gap-11">
          <div className="max-w-[calc(1264px_-_16rem)]">
            <MissionSection mission={mission} activities={missionActivities} />
          </div>
          <footer className="sticky bottom-4 sm:bottom-6 max-w-[calc(1264px_-_12rem)] w-full">
            <MissionBottomBar
              activityStatuses={activityStatuses}
              points={missionTotalXpPoints}
              isLoading={
                isConnecting || (isConnected && isLoadingUserActivities)
              }
            />
          </footer>
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
