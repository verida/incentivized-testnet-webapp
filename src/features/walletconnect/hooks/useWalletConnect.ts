import { useContext } from "react";

import { WalletConnectContext } from "~/features/walletconnect/contexts";

export function useWalletConnect() {
  const context = useContext(WalletConnectContext);
  if (context === null) {
    throw new Error("useVerida must be used within a VeridaProvider");
  }
  return context;
}
