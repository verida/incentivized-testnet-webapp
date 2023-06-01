import { IDatastore } from "@verida/types";

import { TermsConditionsRecordSchema } from "~/features/termsconditions";
import { TERMS_CONDITIONS_V1 } from "~/features/termsconditions/constants";

export function getLatestTermsConditions() {
  return TERMS_CONDITIONS_V1;
}

export async function getTermsRecordFromDatastore(
  datastore: IDatastore | null
) {
  if (!datastore) {
    throw new Error("Terms Datastore must be defined");
  }
  try {
    const termsRecords = await datastore.getMany({}, {});
    if (!termsRecords || termsRecords.length === 0) {
      return null;
    }
    const termsRecordResult = TermsConditionsRecordSchema.safeParse(
      termsRecords[0]
    );
    if (termsRecordResult.success) {
      return termsRecordResult.data;
    }
    return null;
  } catch (error: unknown) {
    throw new Error("Error fetching terms", { cause: error });
  }
}

export async function getStatusFromDatastore(datastore: IDatastore | null) {
  const record = await getTermsRecordFromDatastore(datastore);
  if (!record) {
    return "unknown";
  }
  return record.status;
}

export async function setStatusInDatastore(
  datastore: IDatastore | null,
  status: string
) {
  if (!datastore) {
    throw new Error("Terms Datastore must be defined");
  }
  try {
    const termsRecord = await getTermsRecordFromDatastore(datastore);
    const existingRecord = termsRecord || {};
    await datastore.save({ ...existingRecord, status }, {});
  } catch (error: unknown) {
    throw new Error("Error setting terms", { cause: error });
  }
}
