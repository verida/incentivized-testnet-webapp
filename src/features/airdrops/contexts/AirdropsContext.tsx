import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Airdrop1Modal } from "~/components/modals";
import { isAirdrop1Enabled as isAirdrop1EnabledFunc } from "~/features/airdrops/utils";

export type AirdropsContextType = {
  airdrop1: {
    isEnabled: boolean;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
};

export const airdropsContext = createContext<AirdropsContextType | null>(null);

export type AirdropsProviderProps = PropsWithChildren;

export const AirdropsProvider: React.FC<AirdropsProviderProps> = (props) => {
  const { children } = props;

  // Airdrop 1

  const isAirdrop1Enabled = isAirdrop1EnabledFunc();
  const [isAirdrop1ModalOpen, setIsAirdrop1ModalOpen] = useState(false);

  const openAirdrop1Modal = useCallback(() => {
    setIsAirdrop1ModalOpen(true);
  }, []);

  const closeAirdrop1Modal = useCallback(() => {
    setIsAirdrop1ModalOpen(false);
  }, []);

  const contextValue: AirdropsContextType = useMemo(
    () => ({
      airdrop1: {
        isEnabled: isAirdrop1Enabled,
        isModalOpen: isAirdrop1ModalOpen,
        openModal: openAirdrop1Modal,
        closeModal: closeAirdrop1Modal,
      },
    }),
    [
      isAirdrop1Enabled,
      isAirdrop1ModalOpen,
      openAirdrop1Modal,
      closeAirdrop1Modal,
    ]
  );

  return (
    <airdropsContext.Provider value={contextValue}>
      {children}
      {isAirdrop1Enabled ? <Airdrop1Modal /> : null}
    </airdropsContext.Provider>
  );
};
