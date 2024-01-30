import { PlatformIconType } from "components/atoms";

import { SHARING_PLATFORMS } from "~/features/share/constants";
import { ObjectValues } from "~/types";

export type SharingPlatform = ObjectValues<typeof SHARING_PLATFORMS>;

export type SharingPlatformDefinition = {
  platformId: SharingPlatform;
  label: string;
  iconId: PlatformIconType;
  getUrl: (content: string, title: string) => string;
};
