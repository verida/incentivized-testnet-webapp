import { config } from "~/config";
import {
  Airdrop2CheckDto,
  Airdrop2CheckEligibilitySuccessResponse,
  Airdrop2CheckSuccessResponse,
  Airdrop2ClaimDto,
  Airdrop2ClaimSuccessResponse,
  ApiErrorResponse,
} from "~/features/api/types";
import { Logger } from "~/features/logger";
import { isValidEvmAddress, wait } from "~/utils";

const logger = new Logger("API");

export async function airdrop2LegacyCheckEligibility(
  walletAddress: string
): Promise<Airdrop2CheckEligibilitySuccessResponse | ApiErrorResponse> {
  if (!isValidEvmAddress(walletAddress)) {
    return {
      status: "error",
      errorUserMessage: "Invalid wallet address",
    };
  }

  if (!config.api.baseUrl) {
    throw new Error("No API URL set"); // TODO: Validate with Zod when extracting the env vars
  }
  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/2/eligibility/${walletAddress}`;

  try {
    const result = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });

    // TODO: Validate with Zod
    const data = (await result.json()) as
      | Airdrop2CheckEligibilitySuccessResponse
      | ApiErrorResponse;
    logger.debug("Checking airdrop 2 eligibility", { data });

    return data;
  } catch (error) {
    logger.error("Error checking airdrop 2 eligibility", { error });
    return {
      status: "error",
    };
  }
}

export async function getAirdrop2UserStatus(
  payload: Airdrop2CheckDto
): Promise<Airdrop2CheckSuccessResponse | ApiErrorResponse> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }

  logger.info("Getting airdrop 2 status", { did: payload.did });

  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/2/check`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // TODO: Validate with Zod
    const result = (await response.json()) as
      | Airdrop2CheckSuccessResponse
      | ApiErrorResponse;

    logger.debug("Airdrop 2 status", { result });

    return result;
  } catch (error) {
    logger.error("Error getting airdrop 2 status", { error });
    return {
      status: "error",
    };
  }
}

export async function claimAirdrop2(
  payload: Airdrop2ClaimDto
): Promise<Airdrop2ClaimSuccessResponse | ApiErrorResponse> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }

  logger.info("Claiming airdrop 2", { did: payload.did });
  logger.debug("Payload for claiming airdrop 2", { payload });

  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/2/claim`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 503) {
      // Likely a time out
      logger.info(
        "Airdrop 2 claim resulted in a likely time out, waiting a moment and checking the status",
        { did: payload.did }
      );
      await wait(config.airdrop.timeoutRetryDelay);

      const airdropStatus = await getAirdrop2UserStatus(payload);

      if (airdropStatus.status === "success" && airdropStatus.isClaimed) {
        return {
          status: "success",
          claimedTokenAmount: airdropStatus.claimedTokenAmount ?? 0,
          transactionExplorerUrl: airdropStatus.claimTransactionUrl ?? "-",
        };
      } else {
        return {
          status: "error",
        };
      }
    }

    // TODO: Validate with Zod
    const result = (await response.json()) as
      | Airdrop2ClaimSuccessResponse
      | ApiErrorResponse;

    logger.debug("Airdrop 2 claim result", { result });

    return result;
  } catch (error) {
    logger.error("Error claiming airdrop 2", { error });
    return {
      status: "error",
    };
  }
}
