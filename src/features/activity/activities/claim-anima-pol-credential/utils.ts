import {
  type ReceivedMessage,
  type VeridaVerifiableCredentialRecord,
} from "~/features/verida";

import { ANIMA_PROOF_OF_LIFE_VC_SCHEMA_URLS } from "./constants";
import { type AnimaProofOfLifeCredentialSubject } from "./types";

export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>
): boolean {
  const data = message.data.data[0];
  if (data === undefined) {
    return false;
  }

  const vc =
    data as VeridaVerifiableCredentialRecord<AnimaProofOfLifeCredentialSubject>;

  // TODO: Consider using zod to validate

  if (
    !vc.credentialSchema ||
    !ANIMA_PROOF_OF_LIFE_VC_SCHEMA_URLS.includes(vc.credentialSchema)
  ) {
    return false;
  }

  // TODO: Consider using the issuer DID and the type instead of the schema

  return true;
}
