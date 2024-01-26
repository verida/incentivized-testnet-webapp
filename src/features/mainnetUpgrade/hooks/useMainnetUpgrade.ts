import { useContext } from "react";

import { MainnetUpgradeContext } from "~/features/mainnetUpgrade/contexts";

export function useMainnetUpgrade() {
  const contextValue = useContext(MainnetUpgradeContext);
  if (!contextValue) {
    throw new Error(
      "useMainnetUpgrade must be used within a MainnetUpgradeProvider"
    );
  }
  return contextValue;
}
