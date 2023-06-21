import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IDatastore } from "@verida/types";
import { useEffect, useState } from "react";

import {
  ACTIVITIES_SCHEMA_LATEST_URL,
  deleteActivitiesInDatastore,
  getActivitiesFromDatastore,
  saveActivityInDatastore,
} from "~/features/activity";
import { UserActivity } from "~/features/activity/types";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

export function useActivityQueries() {
  const [activitiesDatastore, setActivitiesDatastore] =
    useState<IDatastore | null>(null);
  const { isConnected, did, openDatastore } = useVerida();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected) {
      setActivitiesDatastore(null);
      return;
    }
    const getDatastore = async () => {
      const datastore = await openDatastore(ACTIVITIES_SCHEMA_LATEST_URL);
      setActivitiesDatastore(datastore);
    };

    try {
      void getDatastore();
    } catch (error: unknown) {
      Sentry.captureException(error);
    }
  }, [isConnected, openDatastore]);

  // TODO: Handle error state
  const { data: userActivities, isLoading: isLoadingActivities } = useQuery({
    queryKey: ["userActivities", did],
    queryFn: async () => {
      Sentry.addBreadcrumb({
        category: "activity",
        level: "info",
        message: "Getting all user activities",
      });

      const userActivities = await getActivitiesFromDatastore(
        activitiesDatastore
      );

      Sentry.addBreadcrumb({
        category: "activity",
        level: "info",
        message: "All user activities fetched",
      });

      return userActivities;
    },
    enabled: !!activitiesDatastore,
    staleTime: 1000 * 60, // 1 minutes
  });

  // TODO: Handle error states
  const { mutate: saveActivity, isLoading: isSavingActivity } = useMutation({
    mutationFn: async (userActivity: UserActivity) => {
      Sentry.addBreadcrumb({
        category: "activity",
        level: "info",
        message: "Saving user activity",
        data: { userActivity },
      });

      await saveActivityInDatastore(activitiesDatastore, userActivity);

      Sentry.addBreadcrumb({
        category: "activity",
        level: "info",
        message: "User activity saved",
        data: { userActivity },
      });
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

  // TODO: Handle error states
  const { mutate: deleteActivities, isLoading: isDeletingActivities } =
    useMutation({
      mutationFn: async () => {
        Sentry.addBreadcrumb({
          category: "activity",
          level: "info",
          message: "Deleting all user activities",
        });

        await deleteActivitiesInDatastore(activitiesDatastore);

        Sentry.addBreadcrumb({
          category: "activity",
          level: "info",
          message: "All user activities deleted",
        });
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
