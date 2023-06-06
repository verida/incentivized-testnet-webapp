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
    throw new Error("Terms datastore must be defined");
  }
  try {
    const records = await datastore.getMany({}, {});
    if (!records || records.length === 0) {
      return null;
    }
    const recordResult = TermsConditionsRecordSchema.safeParse(records[0]);
    if (recordResult.success) {
      return recordResult.data;
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
    throw new Error("Terms datastore must be defined");
  }
  try {
    const record = await getTermsRecordFromDatastore(datastore);
    const existingRecord = record || {};
    await datastore.save({ ...existingRecord, status }, {});
  } catch (error: unknown) {
    throw new Error("Error setting terms", { cause: error });
  }
}

export async function deleteStatusInDatastore(datastore: IDatastore | null) {
  if (!datastore) {
    throw new Error("Terms datastore must be defined");
  }
  try {
    await datastore.deleteAll();
  } catch (error: unknown) {
    throw new Error("Error deleting terms", { cause: error });
  }
}
