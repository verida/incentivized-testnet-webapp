import { config } from "~/config";
import {
  Airdrop1CheckProofExistSuccessResponse,
  Airdrop1SubmitProofSuccessResponse,
  Airdrop2CheckEligibilitySuccessResponse,
  ApiErrorResponse,
  SubmitAirdrop1ProofPayload,
} from "~/features/api/types";
import { Logger } from "~/features/logger";

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

export async function airdrop2CheckEligibility(
  did: string
): Promise<Airdrop2CheckEligibilitySuccessResponse | ApiErrorResponse> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }
  // const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/2/eligibility/${did}`;

  return Promise.resolve({
    status: "success",
    isEligible: true,
  });
}
