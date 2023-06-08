import { WebUser } from "@verida/web-helpers";
import { MutableRefObject } from "react";
import type { MessageDescriptor } from "react-intl";
import { z } from "zod";

import {
  UserActivityRecordSchema,
  UserActivitySchema,
} from "~/features/activity/schemas";

export type Resource = {
  label: string;
  url: string;
};

export type ActivityAction = (
  veridaWebUser: MutableRefObject<WebUser>
) => Promise<ActivityActionResult>;

export type ActivityActionResult = {
  status: ActivityStatus;
  message?: MessageDescriptor;
};

export type Activity = {
  id: string;
  enabled: boolean;
  visible: boolean;
  order: number;
  title: string;
  shortDescription: string;
  longDescription?: string;
  instructions?: string[];
  resources?: Resource[];
  video?: Resource;
  footnote?: string;
  actionLabel: MessageDescriptor;
  actionExecutingLabel: MessageDescriptor;
  action: ActivityAction;
};

export type UserActivity = z.infer<typeof UserActivitySchema>;

export type UserActivityRecord = z.infer<typeof UserActivityRecordSchema>;

export type ActivityStatus = "todo" | "pending" | "completed";
