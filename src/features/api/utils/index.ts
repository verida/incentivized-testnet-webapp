import { config } from "~/config";
import {
  Airdrop1CheckProofExistSuccessResponse,
  Airdrop1SubmitProofSuccessResponse,
  Airdrop2CheckEligibilitySuccessResponse,
  ApiErrorResponse,
  SubmitAirdrop1ProofPayload,
} from "~/features/api/types";
import { Logger } from "~/features/logger";
import { isValidEvmAddress } from "~/utils";

const logger = new Logger("API");

export async function airdrop1CheckProofSubmitted(
  did: string
): Promise<Airdrop1CheckProofExistSuccessResponse | ApiErrorResponse> {
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

    // TODO: Validate with Zod
    const data = (await result.json()) as
      | Airdrop1CheckProofExistSuccessResponse
      | ApiErrorResponse;
    logger.debug("Checking airdrop 1 proof exists", { data });

    return data;
  } catch (error) {
    logger.error("Error checking airdrop 1 proof exists", { error });
    return {
      status: "error",
    };
  }
}

export async function airdrop1SubmitProof(
  payload: SubmitAirdrop1ProofPayload
): Promise<Airdrop1SubmitProofSuccessResponse | ApiErrorResponse> {
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

    // TODO: Validate with Zod
    const data = (await result.json()) as
      | Airdrop1SubmitProofSuccessResponse
      | ApiErrorResponse;
    logger.debug("Submit airdrop 1 proof result", { data });

    return data;
  } catch (error) {
    logger.error("Error submitting airdrop 1 proof", { error });
    return {
      status: "error",
    };
  }
}

export async function airdrop2CheckEligibility(
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
