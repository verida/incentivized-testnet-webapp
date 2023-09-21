import { type UseMutateAsyncFunction } from "@tanstack/react-query";
import { type IMessaging } from "@verida/types";
import { type WebUser } from "@verida/web-helpers";
import { type MutableRefObject, useEffect, useRef } from "react";
import { type DebouncedState } from "use-debounce";

import { Activity, type UserActivity } from "~/features/activity/types";
import { Sentry } from "~/features/sentry";
import { type ReceivedMessage, getMessaging } from "~/features/verida";

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

  useEffect(() => {
    // TODO: Handle change of account
    if (
      !isQueriesReady ||
      !did ||
      userActivities === undefined ||
      listenerInitialisedForDid.current === did
    ) {
      return;
    }

    const handleNewMessage = (message: ReceivedMessage<unknown>) => {
      Promise.allSettled(
        activities
          .filter((activity) => activity.onMessage)
          .map((activity) => {
            const userActivity = userActivities.find(
              (userActivity) => userActivity.id === activity.id
            );

            return activity.onMessage?.(
              message,
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

    let messaging: IMessaging | undefined;

    const initListener = async () => {
      messaging = await getMessaging(webUserInstanceRef.current);
      void messaging?.onMessage(handleNewMessage);
    };

    void initListener();
    listenerInitialisedForDid.current = did;
    return () => {
      void messaging?.offMessage(handleNewMessage);
    };
  }, [
    isQueriesReady,
    activities,
    userActivities,
    webUserInstanceRef,
    did,
    saveActivity,
  ]);
}
