import { type UseMutateAsyncFunction } from "@tanstack/react-query";
import { type WebUser } from "@verida/web-helpers";
import { type MutableRefObject, useEffect, useRef } from "react";
import { type DebouncedState } from "use-debounce";

import {
  Activity,
  ActivityOnUnmount,
  UserActivity,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";

const logger = new Logger("activity");

export function useInitialiseActivities(
  activities: Activity[],
  isQueriesReady: boolean,
  did: string | undefined,
  userActivities: UserActivity[] | undefined,
  webUserInstanceRef: MutableRefObject<WebUser>,
  saveActivity: DebouncedState<
    UseMutateAsyncFunction<void, unknown, UserActivity>
  >
) {
  const initExecutedForDid = useRef<string>("");
  const handlers = useRef<ActivityOnUnmount[]>([]);

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

    logger.info("Initialising activities", { did });

    const initActivities = async () => {
      const results = await Promise.allSettled([
        ...activities.map(async (activity) => {
          const userActivity = userActivities.find(
            (userActivity) => userActivity.id === activity.id
          );

          logger.debug("Calling activity initialisation", {
            activityId: activity.id,
          });
          const cleanupHandler = await activity.onInit(
            webUserInstanceRef,
            userActivity || null,
            saveActivity
          );
          logger.debug("Activity initialisation complete", {
            activityId: activity.id,
          });

          return cleanupHandler;
        }),
      ]);

      const unmountHandlers = results
        .filter(
          (result): result is PromiseFulfilledResult<ActivityOnUnmount> =>
            result.status !== "rejected"
          // Errors are handled in the init handler
        )
        .map((result) => result.value);
      handlers.current = unmountHandlers;
    };

    void initActivities();
    initExecutedForDid.current = did;
  }, [
    activities,
    isQueriesReady,
    did,
    userActivities,
    webUserInstanceRef,
    saveActivity,
  ]);

  useEffect(() => {
    // Clean up activities by calling the unmount handlers
    // TODO: Handle change of account, where we may want to clean up as well but it would not be at unmount.
    return () => {
      logger.info("Calling activities init cleanup");
      if (handlers.current?.length === 0) {
        void Promise.allSettled(handlers.current);
        // Errors are handled in the unmount handler
      }
    };
  }, []);
}
