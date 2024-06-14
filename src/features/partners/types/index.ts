import { MessageDescriptor } from "react-intl";

import { Resource } from "~/types";

export enum PartnerSocialType {
  DISCORD = "discord",
  LINKEDIN = "linkedin",
  MEDIUM = "medium",
  REDDIT = "reddit",
  TELEGRAM = "telegram",
  X = "x",
  WHATSAPP = "whatsapp",
  YOUTUBE = "youtube",
}

export type PartnerSocial = {
  type: PartnerSocialType;
  url: string;
};

export type Partner = {
  id: string;
  name: string;
  description: MessageDescriptor;
  logo: string;
  accentColor: string;
  accentForegoundColor: "dark" | "light";
  visible: boolean;
  resources: Resource[];
  socials: PartnerSocial[];
};
