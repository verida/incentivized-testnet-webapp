import {
  type ReceivedMessage,
  VeridaVerifiableCredentialRecord,
} from "~/features/verida";

import { VERIDA_CREDENTIAL_ZK_SCHEMA_URLS } from "./constants";
import { ReclaimProofOfUberCredentialSubject } from "./types";

export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>
): boolean {
  const data = message.data.data[0];
  if (data === undefined) {
    return false;
  }

  const vc =
    data as VeridaVerifiableCredentialRecord<ReclaimProofOfUberCredentialSubject>;

  // TODO: Consider using zod to validate
  if (
    !vc.credentialSchema ||
    !VERIDA_CREDENTIAL_ZK_SCHEMA_URLS.includes(vc.credentialSchema)
  ) {
    return false;
  }

  return true;
}
