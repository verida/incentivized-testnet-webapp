// Partner
import { MessageDescriptor } from "react-intl";

import { Mission } from "~/features/activity";
import { Resource } from "~/types";

export enum SocialType {
  LINKEDIN = "linkedin",
  YOUTUBE = "youtube",
  X = "x",
  TELEGRAM = "telegram",
  DISCORD = "discord",
  TICKTOCK = "ticktok",
  MEDIUM = "medium",
}

export type Social = {
  id: string;
  title: MessageDescriptor;
  type: SocialType;
  link: string;
  icon?: JSX.Element;
};

export type Partner = {
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
  socials?: Social[];
  image?: string;
};

export type PartnerMission = Mission & {
  partners: string[];
};
