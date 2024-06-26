import { useMemo } from "react";

import { Activity, useActivity } from "~/features/activity";
import { calculateCompletionPercentage } from "~/features/missions/utils";

import { missions } from "../constants";

export function useMissions() {
  const { activities, getUserActivity } = useActivity();

  const missionData = useMemo(() => {
    const missionMap = activities.reduce<Record<string, Activity[]>>(
      (map, activity) => {
        if (!map[activity.missionId]) {
          map[activity.missionId] = [];
        }
        map[activity.missionId].push(activity);
        return map;
      },
      {}
    );

    const getMissionActivities = (missionId: string) => missionMap[missionId];

    const getCompletionPercentage = (missionId: string) =>
      calculateCompletionPercentage(missionMap[missionId], getUserActivity);

    const isMissionCompleted = (missionId: string) => {
      const activityStatuses = getMissionActivities(missionId).map(
        (activity) => {
          const userActivity = getUserActivity(activity.id);
          return userActivity?.status ?? "todo";
        }
      );

      return activityStatuses.every((status) => status === "completed");
    };

    const missionsSortedByCompletionPercentage = missions.sort(
      (a, b) => getCompletionPercentage(b.id) - getCompletionPercentage(a.id)
    );

    return {
      getMissionActivities,
      getCompletionPercentage,
      isMissionCompleted,
      missionsSortedByCompletionPercentage,
    };
  }, [activities, getUserActivity]);

  const getMissionById = (missionId: string) => {
    return missions.find((mission) => mission.id === missionId);
  };

  return { missions, ...missionData, getMissionById };
}
