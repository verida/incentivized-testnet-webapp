import { EnvironmentType } from "@verida/types";

import { config } from "~/config";
import { UserActivityRecord } from "~/features/activity";
import { AIRDROP_1_MIN_XP_POINTS } from "~/features/airdrops/constants";
import { SubmitAirdrop1ProofPayload } from "~/features/airdrops/types";
import { Logger } from "~/features/logger";

const logger = new Logger("Airdrops");

export function isAirdrop1Enabled() {
  return (
    config.airdrops.airdrop1.isEnabled &&
    config.verida.environment === EnvironmentType.MAINNET
  );
}

export async function checkAirdrop1ProofSubmitted(did: string): Promise<
  | {
      status: "success";
      exists: boolean;
    }
  | {
      status: "error";
      message?: string;
    }
> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/1/proofs/${did}`;

  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = (await result.json()) as
      | {
          status: "success";
          exists: boolean;
        }
      | {
          status: "error";
          message?: string;
        };
    logger.debug("Checking claim exists", { data });
    return data;
  } catch (error) {
    logger.error("Error checking claim", { error });
    return {
      status: "error",
    };
  }
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

export async function submitAirdrop1Proof(
  payload: SubmitAirdrop1ProofPayload
): Promise<
  | { status: "success" }
  | {
      status: "error";
      errorMessage?: string;
      errorUserMessage?: string;
    }
> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/1/proofs`;

  try {
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await result.json()) as
      | { status: "success" }
      | {
          status: "error";
          errorMessage?: string;
          errorUserMessage?: string;
        };
    logger.debug("Submit airdrop 1 proof result", { data });
    return data;
  } catch (error) {
    logger.error("Error submitting airdrop 1 proof", { error });
    return {
      status: "error",
    };
  }
}
