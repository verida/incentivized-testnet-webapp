import {
  type ReceivedMessage,
  type VeridaVerifiableCredentialRecord,
} from "~/features/verida";

import { GATEKEEPER_ADOPTER_VC_SCHEMA_URLS } from "./constants";
import { type GateKeeperAdopterCredentialSubject } from "./types";

export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>
): boolean {
  const data = message.data.data[0];
  if (data === undefined) {
    return false;
  }

  const vc =
    data as VeridaVerifiableCredentialRecord<GateKeeperAdopterCredentialSubject>;

  // TODO: Consider using zod to validate

  if (
    !vc.credentialSchema ||
    !GATEKEEPER_ADOPTER_VC_SCHEMA_URLS.includes(vc.credentialSchema)
  ) {
    return false;
  }

  // TODO: Consider using the issuer DID and the type instead of the schema

  // if (
  //   !vc.credentialData?.issuer ||
  //   !GATEKEEPER_ADOPTER_VC_ISSUERS.includes(vc.credentialData.issuer)
  // ) {
  //   return false;
  // }

  //   vc.credentialData?.credentialSubject?.type !== GATEKEEPER_ADOPTER_VC_TYPE
  // or
  //   !vc.credentialData?.type?.includes(GATEKEEPER_ADOPTER_VC_TYPE)
  // if (
  //   vc.credentialData?.credentialSubject?.type !== GATEKEEPER_ADOPTER_VC_TYPE
  // ) {
  //   return false;
  // }

  return true;
}
