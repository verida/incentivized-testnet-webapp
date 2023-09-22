import { type UseMutateAsyncFunction } from "@tanstack/react-query";
import { type IMessaging } from "@verida/types";
import { type WebUser } from "@verida/web-helpers";
import { type MutableRefObject, useEffect, useRef } from "react";
import { type DebouncedState } from "use-debounce";

import { type Activity, type UserActivity } from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import { type ReceivedMessage, getMessaging } from "~/features/verida";

const logger = new Logger("activity");

export function useMessageListener(
  activities: Activity[],
  isQueriesReady: boolean,
  did: string | undefined,
  userActivities: UserActivity[] | undefined,
  webUserInstanceRef: MutableRefObject<WebUser>,
  saveActivity: DebouncedState<
    UseMutateAsyncFunction<void, unknown, UserActivity>
  >
) {
  const listenerInitialisedForDid = useRef<string>("");
  const listenerCallback =
    useRef<(message: ReceivedMessage<unknown>) => void>();

  useEffect(() => {
    // TODO: Handle change of account
    if (!isQueriesReady || !did || userActivities === undefined) {
      return;
    }

    logger.debug("Defining message listener callback");

    const handleNewMessage = (message: ReceivedMessage<unknown>) => {
      logger.info("Received new message");
      Promise.allSettled(
        activities
          .filter((activity) => activity.onMessage)
          .map((activity) => {
            logger.debug("Calling activity message handler", {
              activityId: activity.id,
            });

            const userActivity = userActivities.find(
              (userActivity) => userActivity.id === activity.id
            );

            return activity.onMessage?.(
              message,
              webUserInstanceRef,
              userActivity || null,
              saveActivity
            );
          })
      )
        .then((results) => {
          results.forEach((result) => {
            if (
              result.status === "rejected" &&
              result.reason instanceof Error
            ) {
              Sentry.captureException(result.reason);
            }
          });
        })
        .catch((error: unknown) => {
          Sentry.captureException(error);
        });
    };

    listenerCallback.current = handleNewMessage;
  }, [
    isQueriesReady,
    activities,
    userActivities,
    webUserInstanceRef,
    did,
    saveActivity,
  ]);

  useEffect(() => {
    if (!did || listenerInitialisedForDid.current === did) {
      return;
    }

    logger.info("Setting up message listener", { did });

    let messaging: IMessaging | undefined;

    const initListener = async () => {
      messaging = await getMessaging(webUserInstanceRef.current);
      logger.debug("Adding message listener", { did });
      if (listenerCallback.current) {
        void messaging?.onMessage(listenerCallback.current);
      }
    };

    void initListener();
    listenerInitialisedForDid.current = did;
    return () => {
      logger.info("Cleaning up message listener");
      if (listenerCallback.current) {
        void messaging?.offMessage(listenerCallback.current);
      }
    };
  }, [did, webUserInstanceRef]);
}
