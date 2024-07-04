import React, { createContext, useEffect, useMemo, useState } from "react";

import {
  AIRDROP_1_DEFINITION,
  AIRDROP_2_DEFINITION,
} from "~/features/airdrops/constants";
import { useAirdrop1 } from "~/features/airdrops/hooks";
import { AirdropUserStatus } from "~/features/airdrops/types";
import { useVerida } from "~/features/verida";

type AirdropsContextType = {
  airdropUserStatues: Record<string, AirdropUserStatus>;
};

export const AirdropsContext = createContext<AirdropsContextType | null>(null);

export type AirdropsProviderProps = {
  children?: React.ReactNode;
};

export const AirdropsProvider: React.FC<AirdropsProviderProps> = (props) => {
  const { children } = props;

  const { isConnected: isVeridaConnected, isConnecting: isVeridaConnecting } =
    useVerida();

  const [airdropUserStatues, setAirdropUserStatues] = useState<
    Record<string, AirdropUserStatus>
  >({});

  const {
    userStatus: airdrop1UserStatus,
    isGettingUserStatus: isAirdrop1GettingUserStatus,
  } = useAirdrop1();

  useEffect(() => {
    setAirdropUserStatues({
      [AIRDROP_1_DEFINITION.id]: !isVeridaConnected
        ? "not-connected"
        : airdrop1UserStatus?.isClaimed
          ? "claimed"
          : airdrop1UserStatus?.isRegistered
            ? "registered"
            : isVeridaConnecting ||
                (isVeridaConnected && isAirdrop1GettingUserStatus)
              ? "loading"
              : "none",
      [AIRDROP_2_DEFINITION.id]: !isVeridaConnected ? "not-connected" : "none",
    });
  }, [
    isVeridaConnected,
    isVeridaConnecting,
    airdrop1UserStatus,
    isAirdrop1GettingUserStatus,
  ]);

  const contextValue = useMemo(
    () => ({
      airdropUserStatues,
    }),
    [airdropUserStatues]
  );

  return (
    <AirdropsContext.Provider value={contextValue}>
      {children}
    </AirdropsContext.Provider>
  );
};
