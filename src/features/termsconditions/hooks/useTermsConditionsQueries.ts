import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type IDatastore } from "@verida/types";
import { useDebouncedCallback } from "use-debounce";

import { Sentry } from "~/features/sentry";
import {
  type TermsConditionsStatus,
  deleteStatusInDatastore,
  getStatusFromDatastore,
  setStatusInDatastore,
} from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export function useTermsConditionsQueries(termsDatastore: IDatastore | null) {
  const { did } = useVerida();
  const queryClient = useQueryClient();

  // TODO: Handle error state
  const { data: status, isLoading: isCheckingStatus } = useQuery({
    queryKey: ["terms", did],
    queryFn: () => {
      return getStatusFromDatastore(termsDatastore);
    },
    enabled: !!termsDatastore,
    staleTime: 1000 * 60 * 60 * 24, // 1 day, as term status is not expected to change
  });

  const { mutateAsync: saveStatusMutate, isLoading: isUpdatingStatus } =
    useMutation({
      mutationFn: (status: TermsConditionsStatus) => {
        return setStatusInDatastore(termsDatastore, status);
      },
      onSuccess: async () => {
        // TODO: Optimise with an optimistic update
        await queryClient.invalidateQueries(["terms", did]);
      },
      onError(error) {
        Sentry.captureException(error);
      },
    });

  // Debouncing to avoid document update conflicts
  const saveStatus = useDebouncedCallback(saveStatusMutate, 500, {
    leading: true,
  });

  const { mutateAsync: deleteStatusMutate, isLoading: isDeletingStatus } =
    useMutation({
      mutationFn: () => {
        return deleteStatusInDatastore(termsDatastore);
      },
      onSuccess: async () => {
        // TODO: Optimise with an optimistic update
        await queryClient.invalidateQueries(["terms", did]);
      },
      onError(error) {
        Sentry.captureException(error);
      },
    });

  const deleteStatus = useDebouncedCallback(deleteStatusMutate, 500, {
    leading: true,
  });

  return {
    status,
    isCheckingStatus,
    saveStatus,
    isUpdatingStatus,
    deleteStatus,
    isDeletingStatus,
  };
}
