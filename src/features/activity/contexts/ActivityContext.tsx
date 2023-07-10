import { createContext, useCallback, useMemo } from "react";

import { config } from "~/config";
import { activities } from "~/features/activity/activities";
import {
  useActivitiesDatastore,
  useActivityQueries,
  useExecuteActivity,
  useInitialiseActivities,
  useUserXpPoints,
} from "~/features/activity/hooks";
import { missions } from "~/features/activity/missions";
import type {
  Activity,
  Mission,
  UserActivityRecord,
} from "~/features/activity/types";
import { useVerida } from "~/features/verida";

type ActivityContextType = {
  activities: Activity[];
  missions: Mission[];
  userActivities: UserActivityRecord[];
  userXpPoints: number;
  isLoadingUserActivities: boolean;
  getUserActivity: (activityId: string) => UserActivityRecord | undefined;
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
  const { did, webUserInstanceRef } = useVerida();
  const { activitiesDatastore } = useActivitiesDatastore();
  const {
    isReady: isQueriesReady,
    userActivities,
    isLoadingActivities: isLoadingUserActivities,
    saveActivity,
    deleteActivities,
  } = useActivityQueries(activitiesDatastore);

  const { userXpPoints } = useUserXpPoints(activities, userActivities);

  useInitialiseActivities(
    activities,
    isQueriesReady,
    did,
    userActivities,
    webUserInstanceRef,
    saveActivity
  );

  const { executeActivity } = useExecuteActivity(
    activities,
    activitiesDatastore
  );

  const getUserActivity = useCallback(
    (activityId: string) => {
      return userActivities?.find((activity) => activity.id === activityId);
    },
    [userActivities]
  );

  const deleteUserActivities = useCallback(async () => {
    // deleteActivities handles errors by itself
    await deleteActivities();
  }, [deleteActivities]);

  const contextValue: ActivityContextType = useMemo(
    () => ({
      missions: missions.filter((m) => (config.devMode ? true : m.visible)),
      activities: activities,
      userActivities: userActivities || [],
      userXpPoints,
      isLoadingUserActivities,
      getUserActivity,
      executeActivity,
      deleteUserActivities,
    }),
    [
      userActivities,
      userXpPoints,
      isLoadingUserActivities,
      executeActivity,
      getUserActivity,
      deleteUserActivities,
    ]
  );

  return (
    <ActivityContext.Provider value={contextValue}>
      {props.children}
    </ActivityContext.Provider>
  );
};
