import { createContext, useCallback, useMemo } from "react";

import {
  Activity,
  UserActivities,
  useActivityQueries,
} from "~/features/activity";
import { activities } from "~/features/activity/activities";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

type ActivityContextType = {
  activities: Activity[];
  userActivities: UserActivities;
  executeActivity: (activityId: string) => Promise<void>;
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

type ActivityProviderProps = {
  children?: React.ReactNode;
};

export const ActivityProvider: React.FunctionComponent<
  ActivityProviderProps
> = (props) => {
  const { status: statusTermsConditions } = useTermsConditions();
  const { isConnected, webUserInstanceRef } = useVerida();
  const { updateActivityStatus, userActivities } = useActivityQueries(
    isConnected,
    statusTermsConditions
  );

  const executeActivity = useCallback(
    async (activityId: string) => {
      if (statusTermsConditions !== "accepted") {
        throw new Error("Terms of Use must be accepted");
      }

      const activity = activities.find((a) => a.id === activityId);
      if (!activity) {
        throw new Error(`Activity ${activityId} not found`);
      }

      // Check existing status, if todo, continue, otherwise return or throw error
      const userActivity = userActivities.get(activityId);
      if (userActivity && userActivity.status !== "todo") {
        throw new Error(`Activity ${activityId} already executed`);
      }

      // Execute the action
      const status = await activity.action(webUserInstanceRef);
      updateActivityStatus(activityId, status);
    },
    [
      statusTermsConditions,
      userActivities,
      updateActivityStatus,
      webUserInstanceRef,
    ]
  );

  const contextValue: ActivityContextType = useMemo(
    () => ({
      activities: activities.filter((a) => a.visible),
      userActivities,
      executeActivity,
    }),
    [userActivities, executeActivity]
  );

  return (
    <ActivityContext.Provider value={contextValue}>
      {props.children}
    </ActivityContext.Provider>
  );
};
