import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { Airdrop1Modal, Airdrop2Modal } from "~/components/modals";
import {
  AIRDROP_1_DEFINITION,
  AIRDROP_2_DEFINITION,
} from "~/features/airdrops/constants";
import { AirdropDefinition } from "~/features/airdrops/types";
import {
  isAirdrop1Enabled as isAirdrop1EnabledFunc,
  isAirdrop2Enabled as isAirdrop2EnabledFunc,
} from "~/features/airdrops/utils";

export type AirdropsContextType = {
  airdrop1: {
    metadata: AirdropDefinition;
    isEnabled: boolean;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
  airdrop2: {
    metadata: AirdropDefinition;
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

  // Airdrop 2

  const isAirdrop2Enabled = isAirdrop2EnabledFunc();
  const [isAirdrop2ModalOpen, setIsAirdrop2ModalOpen] = useState(false);

  const openAirdrop2Modal = useCallback(() => {
    setIsAirdrop2ModalOpen(true);
  }, []);

  const closeAirdrop2Modal = useCallback(() => {
    setIsAirdrop2ModalOpen(false);
  }, []);

  const contextValue: AirdropsContextType = useMemo(
    () => ({
      airdrop1: {
        metadata: AIRDROP_1_DEFINITION,
        isEnabled: isAirdrop1Enabled,
        isModalOpen: isAirdrop1ModalOpen,
        openModal: openAirdrop1Modal,
        closeModal: closeAirdrop1Modal,
      },
      airdrop2: {
        metadata: AIRDROP_2_DEFINITION,
        isEnabled: isAirdrop2Enabled,
        isModalOpen: isAirdrop2ModalOpen,
        openModal: openAirdrop2Modal,
        closeModal: closeAirdrop2Modal,
      },
    }),
    [
      isAirdrop1Enabled,
      isAirdrop1ModalOpen,
      openAirdrop1Modal,
      closeAirdrop1Modal,
      isAirdrop2Enabled,
      isAirdrop2ModalOpen,
      openAirdrop2Modal,
      closeAirdrop2Modal,
    ]
  );

  return (
    <airdropsContext.Provider value={contextValue}>
      {children}
      {isAirdrop1Enabled ? <Airdrop1Modal /> : null}
      {isAirdrop2Enabled ? <Airdrop2Modal /> : null}
    </airdropsContext.Provider>
  );
};
