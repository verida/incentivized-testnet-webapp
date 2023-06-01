import React, { useCallback, useEffect, useState } from "react";

import { AcceptTermsAmdConditionsModal } from "~/components/organisms";
import { TermsConditionsStatus } from "~/features/termsconditions/types";
import { getLatestTermsConditions } from "~/features/termsconditions/utils";
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
  // TODO: Implement fetching the terms status from the dedicated datastore
  const [status, setStatus] = useState<TermsConditionsStatus>("unknown");
  const { isConnected } = useVerida();

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

  const updateStatus = useCallback(async (status: TermsConditionsStatus) => {
    // TODO: Implement setting the terms status in the dedicated datastore
    setStatus(status);
    return Promise.resolve();
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const contextValue: TermsConditionsContextType = {
    status,
    updateStatus,
    getLatestVersion: getLatestTermsConditions,
    openAcceptModal,
  };

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
