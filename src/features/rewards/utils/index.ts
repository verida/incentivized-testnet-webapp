import { EnvironmentType } from "@verida/types";

import { config } from "~/config";
import { UserActivityRecord } from "~/features/activity";
import { Logger } from "~/features/logger";
import { SubmitClaimRequestPayload } from "~/features/rewards/types";

const logger = new Logger("rewards");

export function isRewardsEnabled() {
  return config.verida.environment === EnvironmentType.MAINNET;
}

export function checkClaimConditions(
  userActivities: UserActivityRecord[],
  userXpPoints: number
) {
  if (!userActivities.length) {
    throw new Error("No activities completed, unable to claim rewards");
  }

  if (userXpPoints < config.claim.minPoints) {
    throw new Error("Insufficient XP points, unable to claim rewards");
  }
}

export async function checkClaimExists(did: string): Promise<
  | {
      status: "success";
      exists: boolean;
    }
  | {
      status: "error";
      message?: string;
    }
> {
  if (!config.claim.apiBaseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.claim.apiBaseUrl}/api/rest/v1/claims/${did}`;

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

export async function submitClaimRequest(
  payload: SubmitClaimRequestPayload
): Promise<
  | { status: "success" }
  | {
      status: "error";
      message?: string;
    }
> {
  logger.debug("Payload", payload);

  if (!config.claim.apiBaseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.claim.apiBaseUrl}/api/rest/v1/claims`;

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
          message?: string;
        };
    logger.debug("Submit claim result", { data });
    return data;
  } catch (error) {
    logger.error("Error submitting claim", { error });
    return {
      status: "error",
    };
  }
}
