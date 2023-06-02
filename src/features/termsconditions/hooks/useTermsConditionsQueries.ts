import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IDatastore } from "@verida/types";
import { useEffect, useState } from "react";

import { config } from "~/config";
import {
  TermsConditionsStatus,
  getStatusFromDatastore,
  setStatusInDatastore,
} from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export function useTermsConditionsQueries(isUserConnected: boolean) {
  const [termsDatastore, setTermsDatastore] = useState<IDatastore | null>(null);
  const { did, openDatastore } = useVerida();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isUserConnected) {
      return;
    }
    const getDatastore = async () => {
      if (!config.schemas.termsSchemaUrl) {
        throw new Error("Terms Schema URL must be defined");
      }
      const datastore = await openDatastore(config.schemas.termsSchemaUrl);
      setTermsDatastore(datastore);
    };
    void getDatastore();
  }, [isUserConnected, openDatastore]);

  // TODO: Use query states (loading, error, etc.)
  const { data: status, isLoading } = useQuery({
    queryKey: ["terms", did],
    queryFn: () => {
      return getStatusFromDatastore(termsDatastore);
    },
    enabled: !!termsDatastore,
    staleTime: 1000 * 60 * 60 * 24, // 1 day, as term status is not expected to change
  });

  // TODO: Use mutation states (loading, error, etc.)
  const { mutate: saveStatus } = useMutation({
    mutationFn: (status: TermsConditionsStatus) => {
      return setStatusInDatastore(termsDatastore, status);
    },
    onSuccess: async () => {
      // TODO: Optimise with an optimistic update
      await queryClient.invalidateQueries(["terms", did]);
    },
  });

  return {
    isChecking: isLoading,
    status,
    saveStatus,
  };
}
