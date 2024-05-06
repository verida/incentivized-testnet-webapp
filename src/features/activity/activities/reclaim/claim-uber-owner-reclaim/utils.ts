import { VERIDA_CREDENTIAL_RECLAIM_SCHEMA_URLS } from "~/features/activity/activities/reclaim/constants";
import { ReclaimProofOfUberCredentialSubject } from "~/features/activity/activities/reclaim/types";
import {
  type ReceivedMessage,
  VeridaVerifiableCredentialRecord,
} from "~/features/verida";

import { RECLAIM_PROTOCOL_UBER_OWNER_PROVIDER_ID } from "./constants";

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
    vc.credentialSchema &&
    VERIDA_CREDENTIAL_RECLAIM_SCHEMA_URLS.includes(vc.credentialSchema) &&
    vc.credentialData?.credentialSubject?.reclaimProviderId ===
      RECLAIM_PROTOCOL_UBER_OWNER_PROVIDER_ID
  ) {
    return true;
  }

  return false;
}
