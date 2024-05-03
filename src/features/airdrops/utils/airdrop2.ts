import { EnvironmentType } from "@verida/types";

import { config } from "~/config";

export function isAirdrop2Enabled() {
  return (
    config.airdrops.airdrop2.isEnabled &&
    config.verida.environment === EnvironmentType.MAINNET
  );
}

export async function checkAirdrop2Eligibility(did: string): Promise<
  | {
      status: "success";
      isEligible: boolean;
    }
  | {
      status: "error";
      message?: string;
    }
> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }
  // const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/2/eligibility/${did}`;

  return Promise.resolve({
    status: "success",
    isEligible: true,
  });
}
