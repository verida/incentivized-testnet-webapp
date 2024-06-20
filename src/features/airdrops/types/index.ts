import { type MessageDescriptor } from "react-intl";

export type AirdropDefinition = {
  id: number;
  shortTitle: MessageDescriptor;
  longTitle: MessageDescriptor;
  description: MessageDescriptor;
  articleUrl: string;
};
