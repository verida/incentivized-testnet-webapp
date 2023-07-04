import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { WebUser } from "@verida/web-helpers";
import { MutableRefObject, useEffect, useRef } from "react";

import { Activity, UserActivity } from "~/features/activity/types";

export function useInitialiseActivities(
  activities: Activity[],
  isQueriesReady: boolean,
  did: string | undefined,
  userActivities: UserActivity[] | undefined,
  webUserInstanceRef: MutableRefObject<WebUser>,
  saveActivity: UseMutateAsyncFunction<void, unknown, UserActivity>
) {
  const initExecutedForDid = useRef<string>("");

  useEffect(() => {
    if (
      !isQueriesReady ||
      !did ||
      userActivities === undefined ||
      initExecutedForDid.current === did
    ) {
      return;
    }

    const initActivities = async () => {
      const results = await Promise.allSettled([
        activities
          .filter((activity) => {
            return (
              activity.enabled &&
              userActivities.find(
                (userActivity) => userActivity.id === activity.id
              ) === undefined
            );
          })
          .map((activity) => {
            console.debug("Activity init", activity.id);
            return activity.onInit(webUserInstanceRef, saveActivity);
          }),
      ]);

      results.forEach((result) => {
        if (result.status === "rejected") {
          // TODO: Handle error
        }
      });
    };
    void initActivities();

    initExecutedForDid.current = did;

    // Clean up activities by calling onUnmount
    return () => {
      const unmountActivities = async () => {
        const results = await Promise.allSettled([
          activities.map((activity) => {
            console.debug("Activity unmount", activity.id);
            return activity.onUnmount(webUserInstanceRef);
          }),
        ]);

        results.forEach((result) => {
          if (result.status === "rejected") {
            // TODO: Handle error
          }
        });
      };

      void unmountActivities();
    };
  }, [
    activities,
    isQueriesReady,
    did,
    userActivities,
    webUserInstanceRef,
    saveActivity,
  ]);
}
