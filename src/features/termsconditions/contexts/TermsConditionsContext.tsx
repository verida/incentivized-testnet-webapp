import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IDatastore } from "@verida/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { AcceptTermsAmdConditionsModal } from "~/components/organisms";
import { config } from "~/config";
import { TermsConditionsStatus } from "~/features/termsconditions/types";
import {
  getLatestTermsConditions,
  getStatusFromDatastore,
  setStatusInDatastore,
} from "~/features/termsconditions/utils";
import { useVerida } from "~/features/verida";

type TermsConditionsContextType = {
  status: TermsConditionsStatus;
  updateStatus: (status: TermsConditionsStatus) => Promise<void>;
  getLatestVersion: () => string;
  openAcceptModal: () => void;
};

export const TermsConditionsContext =
  React.createContext<TermsConditionsContextType | null>(null);

type TermsConditionsProviderProps = {
  children?: React.ReactNode;
};

export const TermsConditionsProvider: React.FunctionComponent<
  TermsConditionsProviderProps
> = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [termsDatastore, setTermsDatastore] = useState<IDatastore | null>(null);
  const { isConnected, did, openDatastore } = useVerida();

  useEffect(() => {
    if (!isConnected) {
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
  }, [isConnected, openDatastore]);

  const queryClient = useQueryClient();

  // TODO: Use query states (loading, error, etc.)
  const { data: status } = useQuery({
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

  useEffect(() => {
    if (!isConnected || status === "accepted") {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }, [isConnected, status]);

  const openAcceptModal = useCallback(() => {
    if (!isConnected) {
      // Do not open if user not connected
      return;
    }
    setOpenModal(true);
  }, [isConnected]);

  const updateStatus = useCallback(
    async (status: TermsConditionsStatus) => {
      // TODO: Implement setting the terms status in the dedicated datastore
      saveStatus(status);
      return Promise.resolve();
    },
    [saveStatus]
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const contextValue: TermsConditionsContextType = useMemo(
    () => ({
      status: status ?? "unknown",
      updateStatus,
      getLatestVersion: getLatestTermsConditions,
      openAcceptModal,
    }),
    [status, updateStatus, openAcceptModal]
  );

  return (
    <TermsConditionsContext.Provider value={contextValue}>
      {props.children}
      <AcceptTermsAmdConditionsModal
        open={openModal}
        onClose={handleCloseModal}
      />
    </TermsConditionsContext.Provider>
  );
};
