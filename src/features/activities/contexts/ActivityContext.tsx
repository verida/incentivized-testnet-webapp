import { createContext, useCallback, useEffect, useState } from "react";

import type { Activity, UserActivities } from "~/features/activities";
import { activities } from "~/features/activities/constants";
import { useVerida } from "~/features/verida";
import { mockUserActivities } from "~/mock";

type ActivityContextType = {
  activities: Activity[];
  userActivities: UserActivities;
  performActivity: (activityId: string) => Promise<void>;
  completeActivity: (activityId: string) => void;
};

export const ActivityContext = createContext<ActivityContextType | null>(null);

type ActivityProviderProps = {
  children?: React.ReactNode;
};

export const ActivityProvider: React.FunctionComponent<
  ActivityProviderProps
> = (props) => {
  // TODO: Implement fetching the user activies from datastore
  const [userActivities, setUserActivities] = useState<UserActivities>(
    new Map([])
  );

  const { isConnected } = useVerida();

  useEffect(() => {
    if (!isConnected) {
      setUserActivities(new Map([]));
      return;
    }
    setUserActivities(mockUserActivities); // TODO: Remove mock data
  }, [isConnected]);

  const completeActivity = useCallback((activityId: string) => {
    const activity = activities.find((a) => a.id === activityId);
    if (!activity) {
      throw new Error(`Activity ${activityId} not found`);
    }

    setUserActivities((prev) => {
      const existingStatus = prev.get(activityId);
      if (!existingStatus) {
        return new Map([
          ...prev.entries(),
          [activityId, { id: activityId, status: "completed" }],
        ]);
      } else {
        prev.set(activityId, { id: activityId, status: "completed" });
        return new Map([...prev.entries()]);
      }
    });
  }, []);

  const performActivity = useCallback(
    async (activityId: string) => {
      const activity = activities.find((a) => a.id === activityId);
      if (!activity) {
        throw new Error(`Activity ${activityId} not found`);
      }
      return new Promise<void>((resolve) => {
        setUserActivities((prev) => {
          const existingStatus = prev.get(activityId);
          if (!existingStatus) {
            return new Map([
              ...prev.entries(),
              [activityId, { id: activityId, status: "pending" }],
            ]);
          } else {
            prev.set(activityId, { id: activityId, status: "pending" });
            return new Map([...prev.entries()]);
          }
        });
        setTimeout(() => {
          completeActivity(activityId);
          resolve();
        }, 5000);
      });
    },
    [completeActivity]
  );

  const contextValue: ActivityContextType = {
    activities,
    userActivities,
    completeActivity,
    performActivity,
  };

  return (
    <ActivityContext.Provider value={contextValue}>
      {props.children}
    </ActivityContext.Provider>
  );
};
