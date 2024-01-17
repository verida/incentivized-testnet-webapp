import React, { createContext, useCallback, useMemo, useState } from "react";

import { RewardsModal } from "~/components/modals";
import { useRewardsQueries } from "~/features/rewards/hooks";

type RewardsContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isCheckingClaimExists: boolean;
  isClaimExists: boolean;
  isSubmittingClaim: boolean;
  submitClaim: (walletAddress: string) => Promise<void>;
};

export const RewardsContext = createContext<RewardsContextType | null>(null);

export type RewardsContextProps = {
  children: React.ReactNode;
};

export const RewardsProvider: React.FunctionComponent<RewardsContextProps> = (
  props
) => {
  const { children } = props;

  const {
    isCheckingClaimExists,
    isClaimExists,
    isSubmittingClaim,
    submitClaim,
  } = useRewardsQueries();

  // TODO: Turn to url param
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      openModal,
      closeModal,
      isCheckingClaimExists,
      isClaimExists,
      isSubmittingClaim,
      submitClaim,
    }),
    [
      isModalOpen,
      openModal,
      closeModal,
      isCheckingClaimExists,
      isClaimExists,
      isSubmittingClaim,
      submitClaim,
    ]
  );

  return (
    <RewardsContext.Provider value={contextValue}>
      {children}
      <RewardsModal />
    </RewardsContext.Provider>
  );
};
