import { type IDatastore } from "@verida/types";
import { type WebUser } from "@verida/web-helpers";

import {
  UserActivityRecordSchema,
  UserActivitySchema,
} from "~/features/activity/schemas";
import type {
  Activity,
  UserActivity,
  UserActivityRecord,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { Mission } from "~/features/missions";
import { PlausibleEvent, capturePlausibleEvent } from "~/features/plausible";

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

export function getUserActivityForId(
  userActivities: UserActivityRecord[],
  activityId: string
): UserActivityRecord | undefined {
  return userActivities?.find((activity) => activity.id === activityId);
}

export function getActivitiesForMission(
  activities: Activity[],
  missionId: string
): Activity[] {
  return activities.filter((activity) => activity.missionId === missionId);
}

export function getMissionCompletionPercentage(
  activities: Activity[],
  userActivities: UserActivityRecord[],
  missionId: string
): number {
  const missionActivities = getActivitiesForMission(activities, missionId);
  const filteredActivities = missionActivities.filter(
    (activity) => activity.visible
  );

  if (filteredActivities.length === 0) {
    return 0;
  }

  const completedActivities = filteredActivities.filter((activity) => {
    const userActivity = getUserActivityForId(userActivities, activity.id);
    return userActivity?.status === "completed";
  });

  return completedActivities.length / filteredActivities.length;
}

export function getMissionPendingPercentage(
  activities: Activity[],
  userActivities: UserActivityRecord[],
  missionId: string
): number {
  const missionActivities = getActivitiesForMission(activities, missionId);
  const filteredActivities = missionActivities.filter(
    (activity) => activity.visible
  );

  if (filteredActivities.length === 0) {
    return 0;
  }

  const completedActivities = filteredActivities.filter((activity) => {
    const userActivity = getUserActivityForId(userActivities, activity.id);
    return userActivity?.status === "pending";
  });

  return completedActivities.length / filteredActivities.length;
}

export function isMissionCompleted(
  activities: Activity[],
  userActivities: UserActivityRecord[],
  missionId: string
): boolean {
  const missionActivities = getActivitiesForMission(activities, missionId);

  const activityStatuses = missionActivities.map((activity) => {
    const userActivity = getUserActivityForId(userActivities, activity.id);
    // In this particular case, we can consider ended activities as completed
    return activity.ended ? "completed" : (userActivity?.status ?? "todo");
  });

  return activityStatuses.every((status) => status === "completed");
}

export function isMissionStarted(
  activities: Activity[],
  userActivities: UserActivityRecord[],
  missionId: string
): boolean {
  const missionActivities = getActivitiesForMission(activities, missionId);

  const activityStatuses = missionActivities.map((activity) => {
    const userActivity = getUserActivityForId(userActivities, activity.id);
    return userActivity?.status ?? "todo";
  });

  return activityStatuses.every((status) => status === "todo");
}

export function sortMissionsByCompletionPercentage(
  activities: Activity[],
  userActivities: UserActivityRecord[],
  missions: Mission[]
): Mission[] {
  return [...missions].sort((a, b) => {
    const missionACompletionPercentage = getMissionCompletionPercentage(
      activities,
      userActivities,
      a.id
    );

    const missionBCompletionPercentage = getMissionCompletionPercentage(
      activities,
      userActivities,
      b.id
    );

    if (missionACompletionPercentage === missionBCompletionPercentage) {
      const missionAPendingPercentage = getMissionPendingPercentage(
        activities,
        userActivities,
        a.id
      );

      const missionBPendingPercentage = getMissionPendingPercentage(
        activities,
        userActivities,
        b.id
      );

      return missionBPendingPercentage - missionAPendingPercentage;
    }

    return missionBCompletionPercentage - missionACompletionPercentage;
  });
}
