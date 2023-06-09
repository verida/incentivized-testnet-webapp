import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IDatastore } from "@verida/types";
import { useEffect, useState } from "react";

import {
  TERMS_SCHEMA_LATEST_URL,
  TermsConditionsStatus,
  deleteStatusInDatastore,
  getStatusFromDatastore,
  setStatusInDatastore,
} from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export function useTermsConditionsQueries() {
  const [termsDatastore, setTermsDatastore] = useState<IDatastore | null>(null);
  const { isConnected, did, openDatastore } = useVerida();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected) {
      setTermsDatastore(null);
      return;
    }
    const getDatastore = async () => {
      const datastore = await openDatastore(TERMS_SCHEMA_LATEST_URL);
      setTermsDatastore(datastore);
    };
    void getDatastore();
  }, [isConnected, openDatastore]);

  // TODO: Handle error state
  const { data: status, isLoading: isCheckingStatus } = useQuery({
    queryKey: ["terms", did],
    queryFn: () => {
      return getStatusFromDatastore(termsDatastore);
    },
    enabled: !!termsDatastore,
    staleTime: 1000 * 60 * 60 * 24, // 1 day, as term status is not expected to change
  });

  // TODO: Handle error states
  const { mutate: saveStatus, isLoading: isUpdatingStatus } = useMutation({
    mutationFn: (status: TermsConditionsStatus) => {
      return setStatusInDatastore(termsDatastore, status);
    },
    onSuccess: async () => {
      // TODO: Optimise with an optimistic update
      await queryClient.invalidateQueries(["terms", did]);
    },
  });

  // TODO: Handle error states
  const { mutate: deleteStatus, isLoading: isDeletingStatus } = useMutation({
    mutationFn: () => {
      return deleteStatusInDatastore(termsDatastore);
    },
    onSuccess: async () => {
      // TODO: Optimise with an optimistic update
      await queryClient.invalidateQueries(["terms", did]);
    },
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
