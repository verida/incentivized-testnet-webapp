import { config } from "~/config";
import {
  Airdrop2CheckEligibilitySuccessResponse,
  ApiErrorResponse,
} from "~/features/api/types";
import { Logger } from "~/features/logger";
import { isValidEvmAddress } from "~/utils";

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
