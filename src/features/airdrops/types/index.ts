import { type MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

export type AirdropDefinition = {
  id: string;
  order: number;
  enabled: boolean;
  // TODO: Add a registrationStatus?: 'coming' | 'open' | 'closed'
  // TODO: Add registrationCloseDate?: Date
  // TODO: Add a claimStatus: 'coming' | 'open' | 'closed'
  // TODO: Add claimCloseDate: Date
  title: MessageDescriptor;
  description: MessageDescriptor;
  actionLabel: MessageDescriptor;
  requirements: MessageDescriptor;
  resource: Resource;
  vdaAllocation: string;
  accentColor: string;
};

export type AirdropUserStatus = "notApplicable" | "registered" | "claimed";
