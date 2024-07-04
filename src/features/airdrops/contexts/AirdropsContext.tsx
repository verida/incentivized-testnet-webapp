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
    isRegistered: isAirdrop1Registered,
    isClaimed: isAirdrop1Claimed,
    isGettingStatus: isAirdrop1GettingStatus,
  } = useAirdrop1();

  useEffect(() => {
    setAirdropUserStatues({
      [AIRDROP_1_DEFINITION.id]: !isVeridaConnected
        ? "not-connected"
        : isAirdrop1Claimed
          ? "claimed"
          : isAirdrop1Registered
            ? "registered"
            : isVeridaConnecting ||
                (isVeridaConnected && isAirdrop1GettingStatus)
              ? "loading"
              : "none",
      [AIRDROP_2_DEFINITION.id]: !isVeridaConnected ? "not-connected" : "none",
    });
  }, [
    isVeridaConnected,
    isVeridaConnecting,
    isAirdrop1Claimed,
    isAirdrop1GettingStatus,
    isAirdrop1Registered,
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
