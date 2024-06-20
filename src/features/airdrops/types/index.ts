import { type MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

export type AirdropDefinition = {
  id: string;
  order: number;
  enabled: boolean;
  title: MessageDescriptor;
  description: MessageDescriptor;
  actionLabel: MessageDescriptor;
  resource: Resource;
  vdaAllocation: string;
};
