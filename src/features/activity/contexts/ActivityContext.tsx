import { createContext, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";

import { config } from "~/config";
import {
  Activity,
  UserActivityRecord,
  useActivityQueries,
} from "~/features/activity";
import { activities } from "~/features/activity/activities";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

type ActivityContextType = {
  activities: Activity[];
  userActivities: UserActivityRecord[];
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
  const i18n = useIntl();
  const { status: statusTermsConditions } = useTermsConditions();
  const { isConnected, webUserInstanceRef } = useVerida();
  const { userActivities, saveActivity, deleteActivities } = useActivityQueries(
    isConnected,
    statusTermsConditions
  );

  const executeActivity = useCallback(
    async (activityId: string) => {
      if (statusTermsConditions !== "accepted") {
        // Unlikely because blocked by the UI but still
        const termsNotAcceptedNotificationMessage = i18n.formatMessage({
          id: "ActivityProvider.termsNotAcceptedNotificationMessage",
          defaultMessage: "Please accept the terms and conditions",
          description:
            "Notification message when user tries to execute an activity but the terms and conditions are not accepted",
        });
        toast.error(termsNotAcceptedNotificationMessage);
        return;
      }

      const activity = activities.find((a) => a.id === activityId);
      if (!activity) {
        // Unlikely but sill
        const activityNotFoundNotificationMessage = i18n.formatMessage({
          id: "ActivityProvider.activityNotFoundNotificationMessage",
          defaultMessage: "Activity not found",
          description:
            "Notification message when user tries to execute an activity but the activity is not found",
        });
        toast.error(activityNotFoundNotificationMessage);
        return;
      }

      // Check existing status, if todo, continue, otherwise return or throw error
      const userActivity = userActivities?.find(
        (activity) => activity.id === activityId
      );
      if (userActivity && userActivity.status !== "todo") {
        const activityAlreadyExecutedNotificationMessage = i18n.formatMessage({
          id: "ActivityProvider.activityAlreadyExecutedNotificationMessage",
          defaultMessage: "Activity already executed",
          description:
            "Notification message when user tries to execute an activity but the activity is already executed",
        });
        toast.success(activityAlreadyExecutedNotificationMessage);
        return;
      }

      // Execute the action
      const result = await activity.action(webUserInstanceRef);

      // Handle the result
      switch (result.status) {
        case "completed": {
          const activityExecutionCompletedNotificationMessage =
            i18n.formatMessage({
              id: "ActivityProvider.activityExecutionCompletedNotificationMessage",
              defaultMessage: "Congrats, you have completed the activity",
              description:
                "Notification message when user completes an activity",
            });
          toast.success(
            result.message
              ? i18n.formatMessage(result.message)
              : activityExecutionCompletedNotificationMessage
          );
          break;
        }
        case "todo": {
          const activityExecutionTodoNotificationMessage = i18n.formatMessage({
            id: "ActivityProvider.activityExecutionTodoNotificationMessage",
            defaultMessage: "Hmm, the activity was not completed properly",
            description:
              "Notification message when executing an activity reset back to its todo status",
          });
          toast.error(
            result.message
              ? i18n.formatMessage(result.message)
              : activityExecutionTodoNotificationMessage
          );
          break;
        }
        case "pending": {
          const activityExecutionPendingNotificationMessage =
            i18n.formatMessage({
              id: "ActivityProvider.activityExecutionPendingNotificationMessage",
              defaultMessage:
                "The activity is pending, check the next step in the instructions",
              description:
                "Notification message when after the execution, an activity is in pending state",
            });
          toast.success(
            result.message
              ? i18n.formatMessage(result.message)
              : activityExecutionPendingNotificationMessage,
            {
              icon: null,
            }
          );
          break;
        }
        default: {
          // Nothing by default
        }
      }

      // Save the result
      saveActivity({
        id: activityId,
        status: result.status,
      });
    },
    [
      i18n,
      statusTermsConditions,
      userActivities,
      webUserInstanceRef,
      saveActivity,
    ]
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
