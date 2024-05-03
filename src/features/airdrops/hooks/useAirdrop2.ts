import { useContext } from "react";

import { airdropsContext } from "~/features/airdrops/contexts";

export function useAirdrop2() {
  const context = useContext(airdropsContext);
  if (!context) {
    throw new Error("useAirdrop2 must be used within a AirdropsProvider");
  }
  return context.airdrop2;
}
