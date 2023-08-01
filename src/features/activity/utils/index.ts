import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { IDatastore } from "@verida/types";
import type { WebUser } from "@verida/web-helpers";

import {
  UserActivityRecordSchema,
  UserActivitySchema,
} from "~/features/activity/schemas";
import type {
  UserActivity,
  UserActivityRecord,
} from "~/features/activity/types";
import { capturePlausibleEvent } from "~/features/plausible";
import type { ReceivedMessage } from "~/features/verida";

export async function getActivitiesFromDatastore(datastore: IDatastore | null) {
  if (!datastore) {
    throw new Error("Activities datastore must be defined");
  }
  try {
    const records = await datastore.getMany({}, {});

    if (!records || records.length === 0) {
      return [];
    }

    // Validate and return only the valid records
    return records
      .map((record) => {
        const validationResult = UserActivityRecordSchema.safeParse(record);
        if (!validationResult.success) {
          return null;
        }
        return validationResult.data;
      })
      .filter((record): record is UserActivityRecord => record !== null);
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
    const validationResult = UserActivitySchema.safeParse(userActivity);
    if (!validationResult.success) {
      throw new Error("Invalid user activity");
    }

    const records = await getActivitiesFromDatastore(datastore);
    const existingRecord =
      records?.find((record) => record.id === userActivity.id) || {};

    const recordToSave = {
      ...existingRecord,
      ...userActivity,
      completionDate:
        userActivity.completionDate || userActivity.status === "completed"
          ? new Date().toISOString()
          : undefined,
    };

    await datastore.save(recordToSave, {});

    // Capture the completed activity in Plausible
    if (recordToSave.status === "completed") {
      capturePlausibleEvent("Activity Completed", {
        activityId: recordToSave.id,
      });
    }
  } catch (error: unknown) {
    throw new Error("Error saving user activity", { cause: error });
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

export type HandleInitActivityArgs = {
  activityId: string;
  userActivity: UserActivity | null;
  veridaWebUser: WebUser;
  verifyReceivedMessage: (message: ReceivedMessage<unknown>) => boolean;
  saveActivity: UseMutateAsyncFunction<void, unknown, UserActivity>;
  successToastMessage: string;
};
