import { EnvironmentType } from "@verida/types";

import { config } from "~/config";
import { UserActivityRecord } from "~/features/activity";
import { AIRDROP_1_MIN_XP_POINTS } from "~/features/airdrops/constants";

export function isAirdrop1Enabled() {
  return (
    config.airdrops.airdrop1.isEnabled &&
    config.verida.environment === EnvironmentType.MAINNET
  );
}

export function checkAirdrop1Conditions(
  userActivities: UserActivityRecord[],
  userXpPoints: number
) {
  if (!userActivities.length) {
    throw new Error(
      "No activities completed, unable to submit proof for Airdop 1"
    );
  }

  if (userXpPoints < AIRDROP_1_MIN_XP_POINTS) {
    throw new Error(
      "Insufficient XP points, unable to submit proof for Airdop 1"
    );
  }
}
