import type { UserActivities, UserActivity } from "~/features/activities";

export const mockUserActivities: UserActivities = new Map<string, UserActivity>(
  [
    [
      "create-verida-identity",
      { id: "create-verida-identity", status: "completed" },
    ],
  ]
);
