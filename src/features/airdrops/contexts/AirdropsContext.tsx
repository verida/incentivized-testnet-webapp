import React, { createContext, useEffect, useMemo, useState } from "react";

import {
  AIRDROP_1_DEFINITION,
  AIRDROP_2_DEFINITION,
} from "~/features/airdrops/constants";
import { AirdropUserStatus } from "~/features/airdrops/types";

type AirdropsContextType = {
  airdropUserStatues: Record<string, AirdropUserStatus>;
};

export const AirdropsContext = createContext<AirdropsContextType | null>(null);

export type AirdropsProviderProps = {
  children?: React.ReactNode;
};

export const AirdropsProvider: React.FC<AirdropsProviderProps> = (props) => {
  const { children } = props;

  const [airdropUserStatues, setAirdropUserStatues] = useState<
    Record<string, AirdropUserStatus>
  >({});

  useEffect(() => {
    setAirdropUserStatues({
      [AIRDROP_1_DEFINITION.id]: "notApplicable",
      [AIRDROP_2_DEFINITION.id]: "notApplicable",
    });
  }, []);

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
