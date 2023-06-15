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
  const [activitiesDatastore, setTermsDatastore] = useState<IDatastore | null>(
    null
  );
  const { isConnected, did, openDatastore } = useVerida();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected) {
      setTermsDatastore(null);
      return;
    }
    const getDatastore = async () => {
      const datastore = await openDatastore(ACTIVITIES_SCHEMA_LATEST_URL);
      setTermsDatastore(datastore);
    };
    void getDatastore();
  }, [isConnected, openDatastore]);

  // TODO: Handle error state
  const { data: userActivities, isLoading: isLoadingActivities } = useQuery({
    queryKey: ["userActivities", did],
    queryFn: () => {
      return getActivitiesFromDatastore(activitiesDatastore);
    },
    enabled: !!activitiesDatastore,
    staleTime: 1000 * 60, // 1 minutes
  });

  // TODO: Handle error states
  const { mutate: saveActivity, isLoading: isSavingActivity } = useMutation({
    mutationFn: (userActivity: UserActivity) => {
      return saveActivityInDatastore(activitiesDatastore, userActivity);
    },
    onSuccess: async () => {
      // TODO: Optimise with an optimistic update
      await queryClient.invalidateQueries(["userActivities", did]);
    },
    onError(error) {
      Sentry.captureException(error);
    },
  });

  // TODO: Handle error states
  const { mutate: deleteActivities, isLoading: isDeletingActivities } =
    useMutation({
      mutationFn: () => {
        return deleteActivitiesInDatastore(activitiesDatastore);
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
