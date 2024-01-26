import { EnvironmentType } from "@verida/types";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { MainnetUpgradeModal } from "~/components/modals";
import { config } from "~/config";
import { MAINNET_UPGRADE_HIDE_MODAL_LOCAL_STORAGE_KEY } from "~/features/mainnetUpgrade/constants";

type MainnetUpgradeContextType = {
  isModalOpen: boolean;
  acknowledgeUpgrade: () => void;
};

export const MainnetUpgradeContext =
  createContext<MainnetUpgradeContextType | null>(null);

export type MainnetUpgradeProviderProps = {
  children: React.ReactNode;
};

export const MainnetUpgradeProvider: React.FunctionComponent<
  MainnetUpgradeProviderProps
> = (props) => {
  const { children } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const acknowledgeUpgrade = useCallback(() => {
    localStorage.setItem(MAINNET_UPGRADE_HIDE_MODAL_LOCAL_STORAGE_KEY, "true");
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const hideModal = localStorage.getItem(
      MAINNET_UPGRADE_HIDE_MODAL_LOCAL_STORAGE_KEY
    );
    if (
      config.verida.environment !== EnvironmentType.MAINNET ||
      (hideModal && hideModal === "true")
    ) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      acknowledgeUpgrade,
    }),
    [isModalOpen, acknowledgeUpgrade]
  );

  return (
    <MainnetUpgradeContext.Provider value={contextValue}>
      {children}
      <MainnetUpgradeModal />
    </MainnetUpgradeContext.Provider>
  );
};
