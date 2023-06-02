import { WebUser } from "@verida/web-helpers";
import { MutableRefObject } from "react";
import type { MessageDescriptor } from "react-intl";

export type Resource = {
  label: string;
  url: string;
};

export type ActivityAction = (
  veridaWebUser: MutableRefObject<WebUser>
) => Promise<ActivityStatus>;

export type Activity = {
  id: string;
  enabled: boolean;
  visible: boolean;
  order: number;
  title: string;
  shortDescription: string;
  longDescription?: string;
  instructions?: string[];
  resourceUrls?: Resource[];
  videoUrl?: Resource;
  footnote?: string;
  actionLabel: MessageDescriptor;
  action: ActivityAction;
};

export type UserActivity = {
  id: string;
  status: ActivityStatus;
  // TODO: Add need information: proof, ...
};

export type UserActivities = Map<string, UserActivity>;

export type ActivityStatus = "todo" | "pending" | "completed";
