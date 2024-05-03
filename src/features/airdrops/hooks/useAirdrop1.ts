import { useContext } from "react";

import { airdropsContext } from "~/features/airdrops/contexts";

export function useAirdrop1() {
  const context = useContext(airdropsContext);
  if (!context) {
    throw new Error("useAirdrop1 must be used within a AirdropsProvider");
  }
  return context.airdrop1;
}
