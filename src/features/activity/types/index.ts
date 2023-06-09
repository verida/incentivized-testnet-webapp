import { UseMutateFunction } from "@tanstack/react-query";
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

export type ActivityOnInit = (
  veridaWebUser: MutableRefObject<WebUser>,
  saveActivity: UseMutateFunction<void, unknown, UserActivity>
) => Promise<void>;

export type ActivityOnExecute = (
  veridaWebUser: MutableRefObject<WebUser>
) => Promise<ActivityOnExecuteResult>;

export type ActivityOnExecuteResult = {
  status: ActivityStatus;
  message?: MessageDescriptor;
};

export type ActivityOnUnmount = (
  veridaWebUser: MutableRefObject<WebUser>
) => Promise<void>;

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
  onInit: ActivityOnInit;
  onExecute: ActivityOnExecute;
  onUnmount: ActivityOnUnmount;
};

export type UserActivity = z.infer<typeof UserActivitySchema>;

export type UserActivityRecord = z.infer<typeof UserActivityRecordSchema>;

export type ActivityStatus = "todo" | "pending" | "completed";
