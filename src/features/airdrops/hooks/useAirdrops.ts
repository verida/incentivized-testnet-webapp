import { useContext } from "react";

import { airdropsContext } from "~/features/airdrops/contexts";

export function useAirdrops() {
  const context = useContext(airdropsContext);
  if (!context) {
    throw new Error("useAirdrops must be used within a AirdropsProvider");
  }
  return context;
}
