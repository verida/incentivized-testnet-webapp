import { useCallback, useState } from "react";

import { activities } from "~/features/activity/activities";
import { ActivityStatus, UserActivities } from "~/features/activity/types";
import { TermsConditionsStatus } from "~/features/termsconditions";

export function useActivityQueries(
  _isUserConnected: boolean,
  statusTermsConditions: TermsConditionsStatus
) {
  const [userActivities, setUserActivities] = useState<UserActivities>(
    new Map([])
  );

  const updateActivityStatus = useCallback(
    (activityId: string, status: ActivityStatus) => {
      if (statusTermsConditions !== "accepted") {
        throw new Error("Terms of Use must be accepted");
      }

      const activity = activities.find((a) => a.id === activityId);
      if (!activity) {
        throw new Error(`Activity ${activityId} not found`);
      }

      setUserActivities((prev) => {
        const existingStatus = prev.get(activityId);
        if (!existingStatus) {
          return new Map([
            ...prev.entries(),
            [activityId, { id: activityId, status: status }],
          ]);
        } else {
          prev.set(activityId, { id: activityId, status: status });
          return new Map([...prev.entries()]);
        }
      });
    },
    [statusTermsConditions]
  );

  return { userActivities, updateActivityStatus };
}
