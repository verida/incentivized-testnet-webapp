import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { type WebUser } from "@verida/web-helpers";
import { MutableRefObject } from "react";
import { type MessageDescriptor } from "react-intl";
import { type DebouncedState } from "use-debounce";
import { z } from "zod";

import {
  UserActivityDataSchema,
  UserActivityRecordSchema,
  UserActivitySchema,
} from "~/features/activity/schemas";
import { ReceivedMessage } from "~/features/verida";

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
  frozen: boolean;
  order: number;
  title: MessageDescriptor;
  shortDescription: MessageDescriptor;
  longDescription: MessageDescriptor;
  resources?: Resource[];
};

// User activity

export type UserActivity = z.infer<typeof UserActivitySchema>;

export type UserActivityData = z.infer<typeof UserActivityDataSchema>;

export type UserActivityRecord = z.infer<typeof UserActivityRecordSchema>;

export type UserActivityStatus = "todo" | "pending" | "completed";

// Activity

export type ActivityOnUnmount = () => Promise<void>;

export type ActivityOnInit = (
  veridaWebUser: MutableRefObject<WebUser>,
  userActivity: UserActivity | null,
  saveActivity: DebouncedState<
    UseMutateAsyncFunction<void, unknown, UserActivity>
  >
) => Promise<ActivityOnUnmount>;

export type ActivityOnExecute = (
  veridaWebUser: MutableRefObject<WebUser>
) => Promise<ActivityOnExecuteResult>;

export type ActivityOnExecuteResult = {
  status: UserActivityStatus;
  message?: MessageDescriptor;
  data?: UserActivityData;
};

export type ActivityOnMessage = (
  message: ReceivedMessage<unknown>,
  veridaWebUser: MutableRefObject<WebUser>,
  userActivity: UserActivity | null,
  saveActivity: DebouncedState<
    UseMutateAsyncFunction<void, unknown, UserActivity>
  >
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
  longDescription: MessageDescriptor;
  instructions?: MessageDescriptor[];
  resources?: Resource[];
  video?: Resource;
  footnote?: MessageDescriptor;
  actionLabel: MessageDescriptor;
  actionReExecuteLabel?: MessageDescriptor;
  actionExecutingLabel: MessageDescriptor;
  onInit: ActivityOnInit;
  onExecute: ActivityOnExecute;
  onMessage?: ActivityOnMessage;
};
