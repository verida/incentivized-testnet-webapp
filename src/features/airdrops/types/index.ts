import { type MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

export type AirdropDefinition = {
  id: string;
  order: number;
  enabled: boolean;
  // TODO: Add registrationStatus?: "coming" | "opened" | "closed";
  // TODO: Add registrationCloseDate?: Date;
  // TODO: Add claimStatus: 'coming' | 'opened' | 'closed'
  // TODO: Add claimCloseDate: Date
  title: MessageDescriptor;
  description: MessageDescriptor;
  actionLabel: MessageDescriptor;
  actionMessage: MessageDescriptor;
  requirements: MessageDescriptor;
  resource: Resource;
  vdaAllocation: string;
  accentColor: string;
};

export type AirdropUserStatus =
  | "notApplicable"
  | "checking"
  | "waitingRegistration"
  | "registered"
  | "claimed";
