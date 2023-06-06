import { WebUser } from "@verida/web-helpers";
import { MutableRefObject } from "react";
import type { MessageDescriptor } from "react-intl";
import { z } from "zod";

import { ActivityRecordSchema } from "~/features/activity";

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

export type UserActivity = z.infer<typeof ActivityRecordSchema>;

export type ActivityStatus = "todo" | "pending" | "completed";
