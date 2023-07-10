import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { WebUser } from "@verida/web-helpers";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import {
  Activity,
  ActivityOnUnmount,
  UserActivity,
} from "~/features/activity/types";

export function useInitialiseActivities(
  activities: Activity[],
  isQueriesReady: boolean,
  did: string | undefined,
  userActivities: UserActivity[] | undefined,
  webUserInstanceRef: MutableRefObject<WebUser>,
  saveActivity: UseMutateAsyncFunction<void, unknown, UserActivity>
) {
  const initExecutedForDid = useRef<string>("");
  const [onUnmountHandlers, setOnUnmountHandlers] = useState<
    ActivityOnUnmount[]
  >([]);

  useEffect(() => {
    // TODO: Handle change of account
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
        ...activities
          .filter((activity) => {
            const userActivity = userActivities.find(
              (userActivity) => userActivity.id === activity.id
            );
            return (
              activity.enabled &&
              (userActivity === undefined ||
                userActivity?.status !== "completed")
            );
          })
          .map((activity) => {
            const userActivity = userActivities.find(
              (userActivity) => userActivity.id === activity.id
            );
            return activity.onInit(
              webUserInstanceRef,
              userActivity || null,
              saveActivity
            );
          }),
      ]);

      const unmountHandlers = results
        .filter(
          (result): result is PromiseFulfilledResult<ActivityOnUnmount> =>
            result.status !== "rejected"
          // Errors are handled in the init handler
        )
        .map((result) => result.value);
      setOnUnmountHandlers(unmountHandlers);
    };

    void initActivities();
    initExecutedForDid.current = did;

    // Clean up activities by calling the unmount handlers
    return () => {
      void Promise.allSettled(onUnmountHandlers);
      // Errors are handled in the unmount handler
    };
  }, [
    activities,
    isQueriesReady,
    did,
    userActivities,
    webUserInstanceRef,
    saveActivity,
    onUnmountHandlers,
  ]);
}
