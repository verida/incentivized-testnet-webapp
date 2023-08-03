import { type IDatastore } from "@verida/types";
import { type WebUser } from "@verida/web-helpers";

import { TermsConditionsRecordSchema } from "~/features/termsconditions";

export async function getTermsRecordFromDatastore(
  datastore: IDatastore | null,
  veridaWebUser: WebUser
) {
  if (!datastore) {
    throw new Error("Terms datastore must be defined");
  }

  const isConnected = await veridaWebUser.isConnected();
  if (!isConnected) {
    throw new Error("Attempting to get term status but user is disconnected");
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

export async function getStatusFromDatastore(
  datastore: IDatastore | null,
  veridaWebUser: WebUser
) {
  const record = await getTermsRecordFromDatastore(datastore, veridaWebUser);
  if (!record) {
    return "unknown";
  }
  return record.status;
}

export async function setStatusInDatastore(
  datastore: IDatastore | null,
  status: string,
  veridaWebUser: WebUser
) {
  if (!datastore) {
    throw new Error("Terms datastore must be defined");
  }

  const isConnected = await veridaWebUser.isConnected();
  if (!isConnected) {
    throw new Error(
      "Attempting to save a term status but user is disconnected"
    );
  }

  try {
    const record = await getTermsRecordFromDatastore(datastore, veridaWebUser);
    const existingRecord = record || {};
    await datastore.save({ ...existingRecord, status }, {});
  } catch (error: unknown) {
    throw new Error("Error setting terms", { cause: error });
  }
}

export async function deleteStatusInDatastore(
  datastore: IDatastore | null,
  veridaWebUser: WebUser
) {
  if (!datastore) {
    throw new Error("Terms datastore must be defined");
  }

  const isConnected = await veridaWebUser.isConnected();
  if (!isConnected) {
    throw new Error(
      "Attempting to delete all term status but user is disconnected"
    );
  }

  try {
    await datastore.deleteAll();
  } catch (error: unknown) {
    throw new Error("Error deleting terms", { cause: error });
  }
}
