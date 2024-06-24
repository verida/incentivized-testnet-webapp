import { type MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

export type AirdropDefinition = {
  id: string;
  status: AirdropStatus;
  order: number;
  enabled: boolean;
  // TODO: Add registrationCloseDate?: Date;
  // TODO: Add claimCloseDate?: Date
  title: MessageDescriptor;
  description?: MessageDescriptor;
  accentColor: string;
  requirements?: MessageDescriptor;
  resource?: Resource;
  vdaAllocation?: string;
};

export type AirdropStatus =
  | "coming-soon"
  | "registration-opened"
  | "registration-closed"
  | "check"
  | "claim-opened"
  | "claim-closed";

export type AirdropUserStatus =
  | "not-connected"
  | "loading"
  | "none"
  | "registered"
  | "claimed";
