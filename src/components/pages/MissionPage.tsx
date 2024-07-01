import { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { StickyBottomBarBase } from "~/components/atoms";
import { MissionBottomBar, MissionSection } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { useActivity } from "~/features/activity";
import {
  Mission,
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

  const filteroutCurrentMission = useCallback(
    (mission: Mission) => mission.id !== missionId,
    [missionId]
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
      exploreMoreMissionsFilterPredicate={filteroutCurrentMission}
    >
      {mission ? (
        <div className="flex flex-col items-center gap-6 lg:gap-11">
          <div className="max-w-[calc(1264px_-_16rem)]">
            <MissionSection mission={mission} activities={missionActivities} />
          </div>
          <StickyBottomBarBase>
            <MissionBottomBar
              activityStatuses={activityStatuses}
              points={missionTotalXpPoints}
              isLoading={isLoadingUserActivities}
            />
          </StickyBottomBarBase>
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
