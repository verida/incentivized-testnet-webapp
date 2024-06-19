import { type MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

export type Mission = {
  id: string;
  /**
   * @deprecated
   * TODO: To remove when no longer in use
   */
  idLabel: MessageDescriptor;
  enabled: boolean; // TODO: To take into account in new design
  visible: boolean;
  frozen: boolean; // TODO: To take into account in new design
  order: number;
  title: MessageDescriptor;
  description: MessageDescriptor;
  /**
   * @deprecated
   * TODO: To remove when no longer in use
   */
  longDescription: MessageDescriptor;
  resources: Resource[];
};
