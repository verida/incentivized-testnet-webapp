import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Airdrop1Modal } from "~/components/modals";
import { useAirdrop1Queries } from "~/features/airdrops/hooks";
import { isAirdrop1Enabled } from "~/features/airdrops/utils";

export type AirdropsContextType = {
  isAidrop1Enabled: boolean;
  isAirdrop1ModalOpen: boolean;
  openAirdrop1Modal: () => void;
  closeAirdrop1Modal: () => void;
  isCheckingAirdrop1ProofSubmitted: boolean;
  isAirdrop1ProofSubmitted: boolean;
  isSubmittingAirdrop1Proof: boolean;
  submitAirdrop1Proof: (termsAccepted: boolean) => Promise<
    | {
        status: "success";
      }
    | {
        status: "error";
        errorMessage?: string | undefined;
        errorUserMessage?: string | undefined;
      }
  >;
};

export const airdropsContext = createContext<AirdropsContextType | null>(null);

export type AirdropsProviderProps = PropsWithChildren;

export const AirdropsProvider: React.FC<AirdropsProviderProps> = (props) => {
  const { children } = props;

  const isAidrop1Enabled = isAirdrop1Enabled();

  const [isAirdrop1ModalOpen, setIsAirdrop1ModalOpen] = useState(false);

  const openAirdrop1Modal = useCallback(() => {
    setIsAirdrop1ModalOpen(true);
  }, []);

  const closeAirdrop1Modal = useCallback(() => {
    setIsAirdrop1ModalOpen(false);
  }, []);

  const {
    isCheckingProofSubmitted: isCheckingAirdrop1ProofSubmitted,
    isProofSubmitted: isAirdrop1ProofSubmitted,
    isSubmittingProof: isSubmittingAirdrop1Proof,
    submitProof: submitAirdrop1Proof,
  } = useAirdrop1Queries();

  const contextValue: AirdropsContextType = useMemo(
    () => ({
      isAidrop1Enabled,
      isAirdrop1ModalOpen,
      openAirdrop1Modal,
      closeAirdrop1Modal,
      isCheckingAirdrop1ProofSubmitted,
      isAirdrop1ProofSubmitted,
      isSubmittingAirdrop1Proof,
      submitAirdrop1Proof,
    }),
    [
      isAidrop1Enabled,
      isAirdrop1ModalOpen,
      openAirdrop1Modal,
      closeAirdrop1Modal,
      isCheckingAirdrop1ProofSubmitted,
      isAirdrop1ProofSubmitted,
      isSubmittingAirdrop1Proof,
      submitAirdrop1Proof,
    ]
  );

  return (
    <airdropsContext.Provider value={contextValue}>
      {children}
      {isAidrop1Enabled ? <Airdrop1Modal /> : null}
    </airdropsContext.Provider>
  );
};
