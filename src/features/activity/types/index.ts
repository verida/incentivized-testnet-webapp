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
  label: MessageDescriptor;
  url: string;
};

// Mission

export type Mission = {
  id: string;
  idLabel: MessageDescriptor;
  enabled: boolean;
  visible: boolean;
  order: number;
  title: MessageDescriptor;
  shortDescription: MessageDescriptor;
  longDescription?: MessageDescriptor;
};

// Activity

export type ActivityOnInit = (
  veridaWebUser: MutableRefObject<WebUser>,
  saveActivity: UseMutateFunction<void, unknown, UserActivity>
) => Promise<void>;

export type ActivityOnExecute = (
  veridaWebUser: MutableRefObject<WebUser>
) => Promise<ActivityOnExecuteResult>;

export type ActivityOnExecuteResult = {
  status: UserActivityStatus;
  message?: MessageDescriptor;
};

export type ActivityOnUnmount = (
  veridaWebUser: MutableRefObject<WebUser>
) => Promise<void>;

export type Activity = {
  id: string;
  missionId: string;
  enabled: boolean;
  visible: boolean;
  order: number;
  points: number;
  title: MessageDescriptor;
  shortDescription: MessageDescriptor;
  longDescription?: MessageDescriptor;
  instructions?: MessageDescriptor[];
  resources?: Resource[];
  video?: Resource;
  footnote?: MessageDescriptor;
  actionLabel: MessageDescriptor;
  actionExecutingLabel: MessageDescriptor;
  onInit: ActivityOnInit;
  onExecute: ActivityOnExecute;
  onUnmount: ActivityOnUnmount;
};

// User activity

export type UserActivity = z.infer<typeof UserActivitySchema>;

export type UserActivityRecord = z.infer<typeof UserActivityRecordSchema>;

export type UserActivityStatus = "todo" | "pending" | "completed";
