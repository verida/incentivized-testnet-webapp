import {
  createWeb3Modal,
  defaultConfig,
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { ethers } from "ethers";
import React, { PropsWithChildren, useCallback, useMemo } from "react";

import { config } from "~/config";
import { APP_TITLE, DEFAULT_META_DESCRIPTION } from "~/constants";

const polygon = {
  chainId: 137,
  name: "Polygon",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com",
  rpcUrl: config.verida.rpcUrl || "https://rpc.ankr.com/polygon",
};

const metadata = {
  name: APP_TITLE,
  description: DEFAULT_META_DESCRIPTION.defaultMessage,
  url: window.location.origin,
  icons: [config.verida.connectLogoUrl],
};

const ethersConfig = defaultConfig({
  metadata,
});

createWeb3Modal({
  ethersConfig,
  chains: [polygon],
  projectId: config.walletConnect.projectId,
  enableAnalytics: true,
});

export type WalletConnectContextType = {
  isConnected: boolean;
  address: string | undefined;
  connect: () => void;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
};

export const WalletConnectContext =
  React.createContext<WalletConnectContextType | null>(null);

export type WalletConnectProviderProps = PropsWithChildren;

export const WalletConnectProvider: React.FC<WalletConnectProviderProps> = (
  props
) => {
  const { children } = props;

  const { open } = useWeb3Modal();
  const { disconnect: wcDisconnect } = useDisconnect();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const connect = useCallback(() => {
    if (isConnected) {
      return;
    }
    void open();
  }, [isConnected, open]);

  const disconnect = useCallback(() => {
    if (!isConnected) {
      return;
    }
    void wcDisconnect();
  }, [isConnected, wcDisconnect]);

  const signMessage = useCallback(
    async (message: string) => {
      if (!walletProvider) {
        throw new Error("Wallet provider is not available");
      }
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    },
    [walletProvider]
  );

  const contextValue: WalletConnectContextType = useMemo(() => {
    return {
      isConnected,
      address,
      connect,
      disconnect,
      signMessage,
    };
  }, [isConnected, address, connect, disconnect, signMessage]);

  return (
    <WalletConnectContext.Provider value={contextValue}>
      {children}
    </WalletConnectContext.Provider>
  );
};
