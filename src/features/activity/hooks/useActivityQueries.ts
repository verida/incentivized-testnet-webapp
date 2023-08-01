import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type IDatastore } from "@verida/types";

import {
  deleteActivitiesInDatastore,
  getActivitiesFromDatastore,
  saveActivityInDatastore,
} from "~/features/activity";
import { type UserActivity } from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

const logger = new Logger("activity");

export function useActivityQueries(activitiesDatastore: IDatastore | null) {
  const { isConnected, did } = useVerida();
  const queryClient = useQueryClient();

  // TODO: Handle error state
  const { data: userActivities, isLoading: isLoadingActivities } = useQuery({
    queryKey: ["userActivities", did],
    queryFn: async () => {
      logger.info("Getting all user activities");
      const userActivities = await getActivitiesFromDatastore(
        activitiesDatastore
      );
      logger.info("All user activities fetched");

      return userActivities;
    },
    enabled: !!activitiesDatastore && isConnected && !!did,
    staleTime: 1000 * 60, // 1 minutes
  });

  const { mutateAsync: saveActivity, isLoading: isSavingActivity } =
    useMutation({
      mutationFn: async (userActivity: UserActivity) => {
        logger.info("Saving user activity", { userActivity });
        await saveActivityInDatastore(activitiesDatastore, userActivity);
        logger.info("User activity saved", { userActivity });
      },
      onSuccess: async () => {
        // TODO: Optimise with an optimistic update
        await queryClient.invalidateQueries(["userActivities", did]);
      },
      onError(error, variables) {
        Sentry.captureException(error, {
          extra: variables,
          tags: {
            activityId: variables.id,
          },
        });
      },
    });

  const { mutateAsync: deleteActivities, isLoading: isDeletingActivities } =
    useMutation({
      mutationFn: async () => {
        logger.info("Deleting all user activities");
        await deleteActivitiesInDatastore(activitiesDatastore);
        logger.info("All user activities deleted");
      },
      onSuccess: async () => {
        // TODO: Optimise with an optimistic update
        await queryClient.invalidateQueries(["userActivities", did]);
      },
      onError(error) {
        Sentry.captureException(error);
      },
    });

  return {
    isReady: !!activitiesDatastore,
    userActivities,
    isLoadingActivities,
    saveActivity,
    isSavingActivity,
    deleteActivities,
    isDeletingActivities,
  };
}
