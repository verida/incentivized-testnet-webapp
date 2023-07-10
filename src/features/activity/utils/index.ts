import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { IDatastore, IMessaging } from "@verida/types";
import type { WebUser } from "@verida/web-helpers";
import toast from "react-hot-toast";

import {
  UserActivityRecordSchema,
  UserActivitySchema,
} from "~/features/activity/schemas";
import type {
  UserActivity,
  UserActivityRecord,
} from "~/features/activity/types";
import { Sentry } from "~/features/sentry";
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
    await datastore.save(
      {
        ...existingRecord,
        ...userActivity,
        completionDate:
          userActivity.completionDate || userActivity.status === "completed"
            ? new Date().toISOString()
            : undefined,
      },
      {}
    );
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

export type HandleInitActivity = (
  args: HandleInitActivityArgs
) => Promise<() => Promise<void>>;

export const handleInitActivityCheckMessage: HandleInitActivity = async ({
  activityId,
  userActivity,
  veridaWebUser,
  verifyReceivedMessage,
  saveActivity,
  successToastMessage,
}) => {
  const checkMessage = async (message: ReceivedMessage<unknown>) => {
    try {
      const verified = verifyReceivedMessage(message);
      if (!verified) {
        return;
      }

      await saveActivity({
        id: activityId,
        status: "completed",
        data: {},
      });

      toast.success(successToastMessage);
    } catch (error: unknown) {
      Sentry.captureException(error);
    }
  };

  let messaging: IMessaging | undefined;
  try {
    const context = await veridaWebUser.getContext();
    messaging = await context.getMessaging();

    const existingRequestId = userActivity?.data?.requestId;

    if (existingRequestId) {
      const messages = (await messaging.getMessages()) as
        | ReceivedMessage<unknown>[]
        | undefined;

      if (messages) {
        void Promise.allSettled(
          messages
            .filter((message) => message.data.replyId === existingRequestId)
            .map(checkMessage)
        );
      }
    }

    void messaging.onMessage(checkMessage);
  } catch (error: unknown) {
    Sentry.captureException(error);
  }
  return async () => {
    try {
      if (messaging) await messaging.offMessage(checkMessage);
    } catch (error: unknown) {
      Sentry.captureException(error);
    }
  };
};
