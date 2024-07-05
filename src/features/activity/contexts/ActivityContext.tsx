import { createContext, useCallback, useMemo } from "react";

import { activities } from "~/features/activity/activities";
import {
  useActivitiesDatastore,
  useActivityQueries,
  useExecuteActivity,
  useInitialiseActivities,
  useMessageListener,
  useUserXpPoints,
} from "~/features/activity/hooks";
import type { Activity, UserActivityRecord } from "~/features/activity/types";
import { getUserActivityForId } from "~/features/activity/utils";
import { useVerida } from "~/features/verida";

type ActivityContextType = {
  activities: Activity[];
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

  useMessageListener(
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
      return getUserActivityForId(userActivities ?? [], activityId);
    },
    [userActivities]
  );

  const deleteUserActivities = useCallback(async () => {
    // deleteActivities handles errors by itself
    await deleteActivities();
  }, [deleteActivities]);

  const contextValue: ActivityContextType = useMemo(
    () => ({
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
