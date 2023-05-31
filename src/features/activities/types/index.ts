export type Activity = {
  id: string;
  enabled: boolean;
  title: string;
  shortDescription: string;
  actionLabel?: string;
  url?: string;
  note?: string;
};

export type UserActivity = {
  id: string;
  status: ActivityStatus;
  // TODO: Add need information: proof, ...
};

export type UserActivities = Map<string, UserActivity>;

export type ActivityStatus = "todo" | "pending" | "completed";
