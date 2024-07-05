import { useCallback, useMemo } from "react";
import { defineMessage } from "react-intl";
import { useParams } from "react-router-dom";

import { NotFoundMessage } from "~/components/molecules";
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

  const missionEntity = defineMessage({
    id: "MissionPage.missionEntity",
    description: "Entity name for mission not found message",
    defaultMessage: "mission",
  });

  if (!mission) {
    return (
      <PageLayout
        displayExploreMoreMissionsSection={!isOnboardingMission}
        exploreMoreMissionsFilterPredicate={exploreMoreMissionsPredicate}
        contentClassName="flex flex-col"
      >
        <div className="flex-1 flex flex-col justify-center items-center">
          <NotFoundMessage entity={missionEntity} />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      hideReportIssueButton
      displayExploreMoreMissionsSection={!isOnboardingMission}
      exploreMoreMissionsFilterPredicate={exploreMoreMissionsPredicate}
    >
      <div className="flex flex-col items-center gap-6 lg:gap-11">
        <div className="max-w-[calc(1264px_-_16rem)]">
          <MissionSection mission={mission} activities={missionActivities} />
        </div>
        <footer className="sticky bottom-4 sm:bottom-6 max-w-[calc(1264px_-_12rem)] w-full">
          <MissionBottomBar
            activityStatuses={activityStatuses}
            points={missionTotalXpPoints}
            isLoading={isConnecting || (isConnected && isLoadingUserActivities)}
          />
        </footer>
      </div>
    </PageLayout>
  );
};
