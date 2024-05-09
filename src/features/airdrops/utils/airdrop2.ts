import { EnvironmentType } from "@verida/types";

import { config } from "~/config";

export function isAirdrop2Enabled() {
  return (
    config.airdrops.airdrop2.isEnabled &&
    config.verida.environment === EnvironmentType.MAINNET
  );
}
