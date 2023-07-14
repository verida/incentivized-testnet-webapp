import { type IDatastore } from "@verida/types";
import { useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";

import { useActivityQueries } from "~/features/activity/hooks/useActivityQueries";
import { type Activity } from "~/features/activity/types";
import { Sentry } from "~/features/sentry";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export function useExecuteActivity(
  activities: Activity[],
  activitiesDatastore: IDatastore | null
) {
  const i18n = useIntl();
  const executingActivityRef = useRef(false);
  const { webUserInstanceRef } = useVerida();
  const { status: statusTermsConditions } = useTermsConditions();
  const { userActivities, saveActivity } =
    useActivityQueries(activitiesDatastore);

  const executeActivity = useCallback(
    async (activityId: string) => {
      if (executingActivityRef.current) {
        const activityAlreadyBeingExecutedMessage = i18n.formatMessage({
          id: "useExecuteActivity.activityAlreadyBeingExecutedMessage",
          defaultMessage:
            "An activity is already being executed, please wait for it to finish",
          description:
            "Notification message when user try to execute an activity while there's already one being executed",
        });
        toast.success(activityAlreadyBeingExecutedMessage, {
          icon: null,
        });
        return;
      }

      executingActivityRef.current = true;
      try {
        Sentry.addBreadcrumb({
          category: "activity",
          level: "info",
          message: "Executing activity",
          data: {
            activityId,
          },
        });

        if (statusTermsConditions !== "accepted") {
          // Should be avoided by the UI but just in case
          const termsNotAcceptedNotificationMessage = i18n.formatMessage({
            id: "useExecuteActivity.termsNotAcceptedNotificationMessage",
            defaultMessage: "Please accept the terms and conditions",
            description:
              "Notification message when user tries to execute an activity but the terms and conditions are not accepted",
          });
          toast.error(termsNotAcceptedNotificationMessage);
          Sentry.captureException(
            new Error("Trying to execute an activity without terms accepted"),
            {
              tags: {
                activityId,
              },
            }
          );
          return;
        }

        const activity = activities.find((a) => a.id === activityId);

        if (!activity) {
          // Unlikely but sill
          const activityNotFoundNotificationMessage = i18n.formatMessage({
            id: "useExecuteActivity.activityNotFoundNotificationMessage",
            defaultMessage: "Activity not found",
            description:
              "Notification message when user tries to execute an activity but the activity is not found",
          });
          toast.error(activityNotFoundNotificationMessage);
          Sentry.captureException(
            new Error(
              "Trying to execute an activity with an id that cannot be found"
            ),
            {
              tags: {
                activityId,
              },
            }
          );
          return;
        }

        // Check existing status, if todo or pending, continue, otherwise return or throw error
        const userActivity = userActivities?.find(
          (activity) => activity.id === activityId
        );

        if (userActivity && userActivity.status === "completed") {
          // Should be avoided by the UI but just in case
          const activityAlreadyExecutedNotificationMessage = i18n.formatMessage(
            {
              id: "useExecuteActivity.activityAlreadyCompletedNotificationMessage",
              defaultMessage: "Activity already completed",
              description:
                "Notification message when user tries to execute an activity but the activity is already completed",
            }
          );
          toast.success(activityAlreadyExecutedNotificationMessage);
          Sentry.captureException(
            new Error("Trying to execute an activity already completed"),
            {
              tags: {
                activityId,
              },
            }
          );
          return;
        }

        // Execute the action
        let executionResult;
        try {
          executionResult = await activity.onExecute(webUserInstanceRef);
        } catch (error: unknown) {
          const errorWhileExecutionActivityMessage = i18n.formatMessage({
            id: "useExecuteActivity.errorWhileExecutionActivityMessage",
            defaultMessage:
              "Hmm, There was an executing the activity, please wait a moment and try again",
            description:
              "Notification message when user tries to execute an activity but there is an error while executing it",
          });
          toast.error(errorWhileExecutionActivityMessage);
          Sentry.captureException(
            new Error(
              "There was a unhandled error while executing an activity"
            ),
            {
              tags: {
                activityId,
              },
            }
          );
          return;
        }

        // Save the execution result
        try {
          await saveActivity({
            id: activityId,
            status: executionResult.status,
            data: executionResult.data,
          });
        } catch (error: unknown) {
          const errorWhileSavingExecutionResultMessage = i18n.formatMessage({
            id: "useExecuteActivity.errorWhileSavingExecutionResultMessage",
            defaultMessage:
              "Hmm, There was an issue while saving the activity result, please wait a moment and try again",
            description:
              "Notification message when user tries to execute an activity but there is an error while saving the result",
          });
          toast.error(errorWhileSavingExecutionResultMessage);
          // No need to capture the error with Sentry as it has been captured by the mutation error handler ... normally
          return;
        }

        // Notify about the result
        switch (executionResult.status) {
          case "completed": {
            const activityExecutionCompletedNotificationMessage =
              i18n.formatMessage({
                id: "useExecuteActivity.activityExecutionCompletedNotificationMessage",
                defaultMessage: "Congrats, you have completed the activity",
                description:
                  "Notification message when user completes an activity",
              });
            toast.success(
              executionResult.message
                ? i18n.formatMessage(executionResult.message)
                : activityExecutionCompletedNotificationMessage
            );
            break;
          }
          case "todo": {
            const activityExecutionTodoNotificationMessage = i18n.formatMessage(
              {
                id: "useExecuteActivity.activityExecutionTodoNotificationMessage",
                defaultMessage: "Hmm, the activity was not completed properly",
                description:
                  "Notification message when executing an activity reset back to its todo status",
              }
            );
            toast.error(
              executionResult.message
                ? i18n.formatMessage(executionResult.message)
                : activityExecutionTodoNotificationMessage
            );
            break;
          }
          case "pending": {
            const activityExecutionPendingNotificationMessage =
              i18n.formatMessage({
                id: "useExecuteActivity.activityExecutionPendingNotificationMessage",
                defaultMessage:
                  "The activity is pending, check the next step in the instructions",
                description:
                  "Notification message when after the execution, an activity is in pending state",
              });
            toast.success(
              executionResult.message
                ? i18n.formatMessage(executionResult.message)
                : activityExecutionPendingNotificationMessage,
              {
                icon: null,
              }
            );
            break;
          }
          default: {
            const nonSupportedExecutionResultMessage = i18n.formatMessage({
              id: "useExecuteActivity.nonSupportedExecutionResultMessage",
              defaultMessage:
                "Hmm, Something went wrong, please wait a moment and try again",
              description:
                "Notification message when the execution activity resulted in an unknown status",
            });
            toast.error(nonSupportedExecutionResultMessage);
            Sentry.captureException(
              new Error("Non supported status returned by activity.onExecute"),
              {
                tags: {
                  activityId,
                },
              }
            );
          }
        }
      } finally {
        executingActivityRef.current = false;
      }
    },
    [
      activities,
      i18n,
      statusTermsConditions,
      userActivities,
      webUserInstanceRef,
      saveActivity,
    ]
  );

  return {
    executeActivity,
  };
}
