import { createContext, useCallback, useMemo } from "react";

import { config } from "~/config";
import {
  Activity,
  UserActivity,
  useActivityQueries,
} from "~/features/activity";
import { activities } from "~/features/activity/activities";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

type ActivityContextType = {
  activities: Activity[];
  userActivities: UserActivity[];
  getUserActivity: (activityId: string) => UserActivity | undefined;
  executeActivity: (activityId: string) => Promise<void>;
  deleteUserActivities: () => void;
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
  const { userActivities, saveActivity, deleteActivities } = useActivityQueries(
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
      const userActivity = userActivities?.find(
        (activity) => activity.id === activityId
      );
      if (userActivity && userActivity.status !== "todo") {
        throw new Error(`Activity ${activityId} already executed`);
      }

      // Execute the action
      const status = await activity.action(webUserInstanceRef);
      saveActivity({ id: activityId, status });
    },
    [statusTermsConditions, userActivities, webUserInstanceRef, saveActivity]
  );

  const getUserActivity = useCallback(
    (activityId: string) => {
      return userActivities?.find((activity) => activity.id === activityId);
    },
    [userActivities]
  );

  const deleteUserActivities = useCallback(() => {
    deleteActivities();
  }, [deleteActivities]);

  const contextValue: ActivityContextType = useMemo(
    () => ({
      activities: activities.filter((a) => (config.devMode ? true : a.visible)),
      userActivities: userActivities || [],
      getUserActivity,
      executeActivity,
      deleteUserActivities,
    }),
    [userActivities, executeActivity, getUserActivity, deleteUserActivities]
  );

  return (
    <ActivityContext.Provider value={contextValue}>
      {props.children}
    </ActivityContext.Provider>
  );
};
