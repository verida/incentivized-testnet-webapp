import { useContext } from "react";

import { AirdropsContext } from "~/features/airdrops/contexts";

export function useAirdrops() {
  const airdrops = useContext(AirdropsContext);
  if (!airdrops) {
    throw new Error("useAirdrops must be used within a AirdropsProvider");
  }
  return airdrops;
}
