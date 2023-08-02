import { WebUser } from "@verida/web-helpers";

import { VERIDA_CONTEXT_NAME } from "~/constants";
import { Logger } from "~/features/logger";
import {
  ReceivedMessage,
  VeridaMessageType,
  isValidVeridaDid,
  sendMessage,
} from "~/features/verida";

import {
  ACTIVITY_ID,
  REFERRAL_CONFIRMATION_MESSAGE,
  REFERRAL_PARAM,
} from "./constants";

const logger = new Logger("activity");

/**
 * Build the referral URL.
 *
 * @param did The DID of the referree.
 * @returns The URL
 */
export function buildReferralUrl(did: string) {
  return `${window.location.origin}?${REFERRAL_PARAM}=${did}`;
}

/**
 * Verify a message to check if it is a referral confirmation. Messages where the recipient is also the sender are disregarded.
 *
 * @param message The received message.
 * @param userDid The DID of the current user.
 * @returns true if a referral confirmation message, false otherwise.
 */
export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>,
  userDid: string
): boolean {
  if (message.type !== VeridaMessageType.SIMPLE_MESSAGE) {
    return false;
  }

  if (message.sentBy?.did === userDid) {
    return false;
  }

  if (message.message !== REFERRAL_CONFIRMATION_MESSAGE) {
    return false;
  }

  return true;
}

/**
 * Check the URL for a referral details and send the confirmation back to the referrer DID
 *
 * @param veridaWebUser The Verida WebUser instance
 */
export async function checkAndHandleReferralInUrl(veridaWebUser: WebUser) {
  logger.info("Checking referral in URL", { activityId: ACTIVITY_ID });

  const searchParams = new URLSearchParams(document.location.search);
  const referrer = searchParams.get(REFERRAL_PARAM);

  if (!referrer || !isValidVeridaDid(referrer)) {
    logger.info("No referral found in URL", { activityId: ACTIVITY_ID });
    return;
  }

  // If a valid referrer DID was found in the URL, send the confirmation message.
  // Unfortunately unable to check already sent messages. It would have prevented sending another confirmation in case the user using the URL again. Would have also prevented same DID being prevented by multiple referrers.
  logger.info("Referral found in URL, sending confirmation", {
    activityId: ACTIVITY_ID,
    referrer,
  });

  await sendMessage(veridaWebUser, {
    message: REFERRAL_CONFIRMATION_MESSAGE,
    subject: REFERRAL_CONFIRMATION_MESSAGE,
    targetDid: referrer,
    targetContext: VERIDA_CONTEXT_NAME, // This app context name
  });

  logger.info("Referral confirmation successfully sent", {
    activityId: ACTIVITY_ID,
    referrer,
  });
}
