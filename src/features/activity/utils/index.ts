import { IDatastore } from "@verida/types";

import { ActivityRecordSchema, UserActivity } from "~/features/activity";

export async function getActivitiesFromDatastore(datastore: IDatastore | null) {
  if (!datastore) {
    throw new Error("Activities datastore must be defined");
  }
  try {
    const records = await datastore.getMany({}, {});
    if (!records || records.length === 0) {
      return [];
    }
    const validRecords = records.filter(
      (record) => ActivityRecordSchema.safeParse(record).success
    );
    return validRecords as UserActivity[];
  } catch (error: unknown) {
    throw new Error("Error fetching activities", { cause: error });
  }
}

export async function saveActivityInDatastore(
  datastore: IDatastore | null,
  userActivity: UserActivity
) {
  if (!datastore) {
    throw new Error("Activities datastore must be defined");
  }
  try {
    const records = await getActivitiesFromDatastore(datastore);
    const existingRecord =
      records?.find((record) => record.id === userActivity.id) || {};
    await datastore.save({ ...existingRecord, ...userActivity }, {});
  } catch (error: unknown) {
    throw new Error("Error setting terms", { cause: error });
  }
}

export async function deleteActivitiesInDatastore(
  datastore: IDatastore | null
) {
  if (!datastore) {
    throw new Error("Activities datastore must be defined");
  }
  try {
    await datastore.deleteAll();
  } catch (error: unknown) {
    throw new Error("Error deleting activities", { cause: error });
  }
}
