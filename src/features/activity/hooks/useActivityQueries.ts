import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IDatastore } from "@verida/types";
import { useEffect, useState } from "react";

import { config } from "~/config";
import {
  deleteActivitiesInDatastore,
  getActivitiesFromDatastore,
  saveActivityInDatastore,
} from "~/features/activity";
import { UserActivity } from "~/features/activity/types";
import { TermsConditionsStatus } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export function useActivityQueries(
  isUserConnected: boolean,
  statusTermsConditions: TermsConditionsStatus
) {
  const [activitiesDatastore, setTermsDatastore] = useState<IDatastore | null>(
    null
  );
  const { did, openDatastore } = useVerida();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isUserConnected) {
      return;
    }
    const getDatastore = async () => {
      if (!config.schemas.activitiesSchemaUrl) {
        throw new Error("Activities Schema URL must be defined");
      }
      const datastore = await openDatastore(config.schemas.activitiesSchemaUrl);
      setTermsDatastore(datastore);
    };
    void getDatastore();
  }, [isUserConnected, openDatastore]);

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
    });

  return {
    userActivities,
    isLoadingActivities,
    saveActivity,
    isSavingActivity,
    deleteActivities,
    isDeletingActivities,
  };
}
