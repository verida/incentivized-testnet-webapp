import { Icon } from "~/components/atoms";

export const veridaSupportPlatforms = {
  discord: {
    label: "Discord",
    url: "https://discord.verida.io/",
    icon: <Icon type="platform-discord" />,
  },
  x: {
    label: "X (Twitter)",
    url: "https://twitter.com/verida_io",
    icon: <Icon type="platform-x" />,
  },
  telegram: {
    label: "Telegram",
    url: "https://t.me/verida_community",
    icon: <Icon type="platform-telegram" />,
  },
  medium: {
    label: "Medium",
    url: "https://news.verida.io/",
    icon: <Icon type="platform-medium" />,
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/verida-technology",
    icon: <Icon type="platform-linkedin" />,
  },
  youtube: {
    label: "Youtube",
    url: "https://www.youtube.com/@verida_io",
    icon: <Icon type="platform-youtube" />,
  },
  reddit: {
    label: "Reddit",
    url: "https://www.reddit.com/r/Verida/",
    icon: <Icon type="platform-reddit" />,
  },
} as const;
