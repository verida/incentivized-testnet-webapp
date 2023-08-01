import { ReceivedMessage, VeridaMessageType } from "~/features/verida";

import { REFERRAL_CONFIRMATION_MESSAGE, REFERRAL_PARAM } from "./constants";

export function buildReferralUrl(did: string) {
  return `${window.location.origin}?${REFERRAL_PARAM}=${did}`;
}

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
