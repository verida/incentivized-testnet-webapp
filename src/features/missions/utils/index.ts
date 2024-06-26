import { Activity, UserActivity } from "~/features/activity";
import { MISSION_01_ID, missions } from "~/features/missions/constants";

export function getMissionById(missionId: string) {
  return missions.find((mission) => mission.id === missionId);
}

export function isOnboardingMission(missionId: string) {
  return missionId === MISSION_01_ID;
}

export function calculateCompletionPercentage(
  missionActivities: Activity[],
  getUserActivity: (id: string) => UserActivity | undefined
) {
  if (missionActivities.length === 0) return 0;

  const completedActivities = missionActivities.filter((activity) => {
    const userActivity = getUserActivity(activity.id);
    return userActivity?.status === "completed";
  });

  return (completedActivities.length / missionActivities.length) * 100;
}
