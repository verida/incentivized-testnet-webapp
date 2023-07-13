import { useMemo } from "react";

import type { Activity, UserActivity } from "~/features/activity";

export function useUserXpPoints(
  activities: Activity[],
  userActivities: UserActivity[] | undefined
) {
  const userXpPoints = useMemo(() => {
    return userActivities
      ? userActivities.reduce((acc, userActivity) => {
          if (userActivity.status !== "completed") {
            return acc;
          }
          const activity = activities.find(
            (activity) => activity.id === userActivity.id
          );
          if (activity === undefined) {
            return acc;
          }
          return acc + activity.points;
        }, 0)
      : 0;
  }, [activities, userActivities]);

  return { userXpPoints };
}
