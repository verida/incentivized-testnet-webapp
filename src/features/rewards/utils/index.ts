import { config } from "~/config";
import { UserActivityRecord } from "~/features/activity";
import { Logger } from "~/features/logger";
import { SubmitClaimRequestPayload } from "~/features/rewards/types";

const logger = new Logger("rewards");

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

export async function checkClaimExists(did: string) {
  if (!config.claim.apiBaseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.claim.apiBaseUrl}/api/rest/v1/claims/${did}`;

  try {
    // TODO: Better handle fetch
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    logger.debug("Checking claim exists", { result });
    return result.json() as Promise<{ exists: boolean }>;
  } catch (error) {
    logger.error("Error checking claim", { error });
  }
}

export async function submitClaimRequest(payload: SubmitClaimRequestPayload) {
  logger.debug("Payload", payload);

  if (!config.claim.apiBaseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.claim.apiBaseUrl}/api/rest/v1/claims`;

  try {
    // TODO: Better handle fetch
    const result = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    logger.debug("Submit claim result", { result });
  } catch (error) {
    logger.error("Error submitting claim", { error });
  }
}
