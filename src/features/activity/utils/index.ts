import { type UseMutateAsyncFunction } from "@tanstack/react-query";
import { type IDatastore } from "@verida/types";
import { type WebUser } from "@verida/web-helpers";

import {
  UserActivityRecordSchema,
  UserActivitySchema,
} from "~/features/activity/schemas";
import type {
  UserActivity,
  UserActivityRecord,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { PlausibleEvent, capturePlausibleEvent } from "~/features/plausible";
import type { ReceivedMessage } from "~/features/verida";

const logger = new Logger("activity");

export async function getActivitiesFromDatastore(
  datastore: IDatastore | null,
  veridaWebUser: WebUser
) {
  if (!datastore) {
    throw new Error("Activities datastore must be defined");
  }

  const isConnected = veridaWebUser.isConnected();
  if (!isConnected) {
    throw new Error("Attempting to get user activies but user is disconnected");
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
  userActivity: UserActivity,
  veridaWebUser: WebUser
) {
  if (!datastore) {
    throw new Error("Activities datastore must be defined");
  }

  const isConnected = veridaWebUser.isConnected();
  if (!isConnected) {
    throw new Error(
      "Attempting to save a user activity but user is disconnected"
    );
  }

  try {
    const validationResult = UserActivitySchema.safeParse(userActivity);
    if (!validationResult.success) {
      throw new Error("Invalid user activity");
    }

    logger.debug("User activity to save", {
      userActivity,
    });

    const records = await getActivitiesFromDatastore(datastore, veridaWebUser);
    const existingRecord = records?.find(
      (record) => record.id === userActivity.id
    );

    logger.debug("Existing user activity record", {
      existingRecord,
    });

    const recordToSave = {
      ...existingRecord,
      ...userActivity,
      completionDate:
        userActivity.completionDate || userActivity.status === "completed"
          ? new Date().toISOString()
          : undefined,
      data: {
        ...existingRecord?.data,
        ...userActivity.data,
      },
    };

    logger.debug("Record to save", {
      recordToSave,
    });

    await datastore.save(recordToSave, {});

    // Capture the completed activity in Plausible
    if (recordToSave.status === "completed") {
      capturePlausibleEvent(PlausibleEvent.ACTIVITY_COMPLETED, {
        activityId: recordToSave.id,
      });
    }
  } catch (error: unknown) {
    throw new Error("Error saving user activity", { cause: error });
  }
}

export async function deleteActivitiesInDatastore(
  datastore: IDatastore | null,
  veridaWebUser: WebUser
) {
  if (!datastore) {
    throw new Error("Activities datastore must be defined");
  }

  const isConnected = veridaWebUser.isConnected();
  if (!isConnected) {
    throw new Error(
      "Attempting to delete all user activities but user is disconnected"
    );
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
