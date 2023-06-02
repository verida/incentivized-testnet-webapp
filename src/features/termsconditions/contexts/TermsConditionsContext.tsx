import React, { useCallback, useEffect, useMemo, useState } from "react";

import { AcceptTermsAmdConditionsModal } from "~/components/organisms";
import { useTermsConditionsQueries } from "~/features/termsconditions/hooks";
import { TermsConditionsStatus } from "~/features/termsconditions/types";
import { getLatestTermsConditions } from "~/features/termsconditions/utils";
import { useVerida } from "~/features/verida";

type TermsConditionsContextType = {
  isChecking: boolean;
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
  const { isConnected } = useVerida();

  const { isChecking, status, saveStatus } =
    useTermsConditionsQueries(isConnected);

  useEffect(() => {
    if (!isConnected || isChecking || status === "accepted") {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }, [isChecking, isConnected, status]);

  const openAcceptModal = useCallback(() => {
    if (!isConnected || isChecking) {
      // Do not open if user not connected
      return;
    }
    setOpenModal(true);
  }, [isConnected, isChecking]);

  const updateStatus = useCallback(
    async (status: TermsConditionsStatus) => {
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
      isChecking,
      status: status ?? "unknown",
      updateStatus,
      getLatestVersion: getLatestTermsConditions,
      openAcceptModal,
    }),
    [isChecking, status, updateStatus, openAcceptModal]
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
