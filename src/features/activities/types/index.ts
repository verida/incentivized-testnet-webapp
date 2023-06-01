import type { MessageDescriptor } from "react-intl";

export type Activity = {
  id: string;
  enabled: boolean;
  visible: boolean;
  order: number;
  title: string;
  shortDescription: string;
  longDescription?: string;
  instructions?: string[];
  resourceUrls?: string[];
  videoUrl?: string;
  note?: string;
  actionLabel: MessageDescriptor;
};

export type UserActivity = {
  id: string;
  status: ActivityStatus;
  // TODO: Add need information: proof, ...
};

export type UserActivities = Map<string, UserActivity>;

export type ActivityStatus = "todo" | "pending" | "completed";
