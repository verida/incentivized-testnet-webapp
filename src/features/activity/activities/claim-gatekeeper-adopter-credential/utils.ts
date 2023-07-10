import { ReceivedMessage, VerifiableCredential } from "~/features/verida";

import { GATEKEEPER_ADOPTER_VC_SCHEMA_URL } from "./constants";

export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>
): boolean {
  const data = message.data.data[0];
  if (data === undefined) {
    return false;
  }

  const vc = data as VerifiableCredential;
  // TODO: Check the issuer DID?
  return vc.credentialSchema === GATEKEEPER_ADOPTER_VC_SCHEMA_URL
    ? true
    : false;
}
