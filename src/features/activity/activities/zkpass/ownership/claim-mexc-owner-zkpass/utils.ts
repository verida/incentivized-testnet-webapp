import { VERIDA_CREDENTIAL_ZKPASS_SCHEMA_URLS } from "~/features/activity/activities/zkpass/constants";
import { ZkPassCredentialSubject } from "~/features/activity/activities/zkpass/types";
import {
  type ReceivedMessage,
  VeridaVerifiableCredentialRecord,
} from "~/features/verida";

import { ZKPASS_MEXC_OWNER_SCHEMA_ID } from "./constants";

export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>
): boolean {
  const data = message.data.data[0];
  if (data === undefined) {
    return false;
  }

  const vc = data as VeridaVerifiableCredentialRecord<ZkPassCredentialSubject>;

  // TODO: Consider using zod to validate
  if (
    vc.credentialSchema &&
    VERIDA_CREDENTIAL_ZKPASS_SCHEMA_URLS.includes(vc.credentialSchema) &&
    vc.credentialData?.credentialSubject?.zkPassSchemaId ===
      ZKPASS_MEXC_OWNER_SCHEMA_ID
  ) {
    return true;
  }

  return false;
}
