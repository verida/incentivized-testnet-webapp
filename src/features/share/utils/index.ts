import { SHARING_PLATFORMS } from "~/features/share/constants";
import {
  SharingPlatform,
  SharingPlatformDefinition,
} from "~/features/share/types";

export const hasWebShare = () => !!navigator.canShare;

export const shareData = async (data: ShareData): Promise<boolean> => {
  try {
    await navigator?.share(data);
    return true;
  } catch (error) {
    return false;
  }
};

export const sharingPlatformDefinitions: Record<
  SharingPlatform,
  SharingPlatformDefinition
> = {
  [SHARING_PLATFORMS.X]: {
    platformId: SHARING_PLATFORMS.X,
    label: "X",
    iconId: "platform-x",
    getUrl: (content: string, title: string): string => {
      const combinedText = `${encodeURI(title)}%0A%0A${encodeURI(content)}`;
      return `https://twitter.com/intent/tweet?text=${combinedText}`;
    },
  },
  [SHARING_PLATFORMS.TELEGRAM]: {
    platformId: SHARING_PLATFORMS.TELEGRAM,
    label: "Telegram",
    iconId: "platform-telegram",
    getUrl: (content: string, title: string): string => {
      return `https://telegram.me/share/?url=${encodeURI(
        content
      )}&text=${encodeURI(title)}`;
    },
  },
  [SHARING_PLATFORMS.WHATSAPP]: {
    platformId: SHARING_PLATFORMS.WHATSAPP,
    label: "WhatsApp",
    iconId: "platform-whatsapp",
    getUrl: (content: string, title: string): string => {
      const combinedText = `${encodeURI(title)}%0A%0A${encodeURI(content)}`;
      return `https://api.whatsapp.com/send?phone=&text=${combinedText}`;
    },
  },
};
