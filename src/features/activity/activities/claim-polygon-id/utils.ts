import {
  type ReceivedMessage,
  type VeridaVerifiableCredentialRecord,
} from "~/features/verida";

import { POLYGON_ID_KYC_AGE_VC_SCHEMA_URL } from "./constants";

export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>
): boolean {
  const data = message.data.data[0];
  if (data === undefined) {
    return false;
  }

  const vc = data as VeridaVerifiableCredentialRecord;

  // TODO: Look at the GateKeeper activity for the evolution of the verification

  return vc.credentialSchema === POLYGON_ID_KYC_AGE_VC_SCHEMA_URL
    ? true
    : false;
}
