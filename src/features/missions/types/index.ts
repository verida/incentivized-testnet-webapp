import { type MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

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
