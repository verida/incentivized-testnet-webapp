import { config } from "~/config";
import {
  Airdrop1CheckSuccessResponse,
  Airdrop1ClaimDto,
  Airdrop1ClaimSuccessResponse,
  Airdrop1RegisterSuccessResponse,
  Airdrop1RegistrationDto,
  ApiErrorResponse,
} from "~/features/api/types";
import { Logger } from "~/features/logger";

const logger = new Logger("API");

export async function getAirdrop1Status(
  did: string
): Promise<Airdrop1CheckSuccessResponse | ApiErrorResponse> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/1/check/${did}`;

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
      | Airdrop1CheckSuccessResponse
      | ApiErrorResponse;
    logger.debug("Getting airdrop 1 status", { data });

    return data;
  } catch (error) {
    logger.error("Error checking airdrop 1 proof exists", { error });
    return {
      status: "error",
    };
  }
}

export async function registerAirdrop1(
  payload: Airdrop1RegistrationDto
): Promise<Airdrop1RegisterSuccessResponse | ApiErrorResponse> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/1/register`;

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
      | Airdrop1RegisterSuccessResponse
      | ApiErrorResponse;
    logger.debug("Airdrop 1 registration result", { data });

    return data;
  } catch (error) {
    logger.error("Error registering for airdrop 1", { error });
    return {
      status: "error",
    };
  }
}

export async function claimAirdrop1(
  payload: Airdrop1ClaimDto
): Promise<Airdrop1ClaimSuccessResponse | ApiErrorResponse> {
  if (!config.api.baseUrl) {
    throw new Error("No API URL set");
  }
  const apiUrl = `${config.api.baseUrl}/api/rest/v1/airdrops/1/claim`;

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
      | Airdrop1ClaimSuccessResponse
      | ApiErrorResponse;
    logger.debug("Airdrop 1 claim result", { data });

    return data;
  } catch (error) {
    logger.error("Error claiming airdrop 1", { error });
    return {
      status: "error",
    };
  }
}
