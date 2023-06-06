import React, { useCallback, useEffect, useMemo, useState } from "react";

import { AcceptTermsAmdConditionsModal } from "~/components/organisms";
import { useTermsConditionsQueries } from "~/features/termsconditions/hooks";
import { TermsConditionsStatus } from "~/features/termsconditions/types";
import { getLatestTermsConditions } from "~/features/termsconditions/utils";
import { useVerida } from "~/features/verida";

type TermsConditionsContextType = {
  isCheckingStatus: boolean;
  status: TermsConditionsStatus;
  updateStatus: (status: TermsConditionsStatus) => void;
  deleteTermsStatus: () => void;
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
  const { isConnected } = useVerida();

  const { isCheckingStatus, status, saveStatus, deleteStatus } =
    useTermsConditionsQueries(isConnected);

  useEffect(() => {
    if (!isConnected || isCheckingStatus || status === "accepted") {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }, [isCheckingStatus, isConnected, status]);

  const openAcceptModal = useCallback(() => {
    if (!isConnected || isCheckingStatus) {
      // Do not open if user not connected
      return;
    }
    setOpenModal(true);
  }, [isConnected, isCheckingStatus]);

  const updateStatus = useCallback(
    (status: TermsConditionsStatus) => {
      saveStatus(status);
    },
    [saveStatus]
  );

  const deleteTermsStatus = useCallback(() => {
    deleteStatus();
  }, [deleteStatus]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const contextValue: TermsConditionsContextType = useMemo(
    () => ({
      isCheckingStatus,
      status: status ?? "unknown",
      updateStatus,
      deleteTermsStatus,
      getLatestVersion: getLatestTermsConditions,
      openAcceptModal,
    }),
    [isCheckingStatus, status, updateStatus, deleteTermsStatus, openAcceptModal]
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
