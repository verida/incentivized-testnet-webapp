import { useContext } from "react";

import { RewardsContext } from "~/features/rewards/contexts";

export function useRewards() {
  const contextValue = useContext(RewardsContext);
  if (!contextValue) {
    throw new Error("useRewards must be used within a RewardsProvider");
  }
  return contextValue;
}
