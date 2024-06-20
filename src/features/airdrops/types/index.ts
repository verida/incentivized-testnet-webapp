import { type MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

export type AirdropDefinition = {
  id: number;
  enabled: boolean;
  shortTitle: MessageDescriptor;
  longTitle: MessageDescriptor;
  description: MessageDescriptor;
  resource: Resource;
  vdaAllocation: string;
};
