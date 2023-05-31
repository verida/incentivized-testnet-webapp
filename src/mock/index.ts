import type { UserActivities, UserActivity } from "~/features/activities";

export const mockUserActivities: UserActivities = new Map<string, UserActivity>(
  [["1", { id: "1", status: "completed" }]]
);
