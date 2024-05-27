import { defineMessage } from "react-intl";

import { Icon } from "~/components/atoms";
import { type Partner, SocialType } from "~/features/activity/types";

export const PARTNER_01_ID = "partner-01";

export const partner: Partner = {
  id: PARTNER_01_ID,
  idLabel: defineMessage({
    id: "partners.partner-01.idLabel",
    defaultMessage: "Polygon",
    description: "Label of the partner id 01",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 1,
  title: defineMessage({
    id: "partners.partner-01.title",
    defaultMessage: "Polygon",
    description: "Title of the partner 01",
  }),
  shortDescription: defineMessage({
    id: "partners.partner-01.shortDescription",
    defaultMessage: "Activities from Polygon",
    description: "Short description of the partner 01",
  }),
  longDescription: defineMessage({
    id: "partners.partner-01.longDescription",
    defaultMessage: "Activities from Polygon",
    description: "Long description of the partner 01",
  }),
  image: "/images/partners/polygon.png",
  resources: [
    {
      label: defineMessage({
        id: "partners.partner-01.resource.verida.title",
        description: "Description of resource",
        defaultMessage: "verida.network",
      }),
      url: "https://www.verida.network",
    },
    {
      label: defineMessage({
        id: "partners.partner-01.resource.polygon.title",
        description: "Description of resource",
        defaultMessage: "polygonscan.io",
      }),
      url: "https://www.polygonscan.io",
    },
  ],
  socials: [
    {
      id: "01",
      title: defineMessage({
        id: "partners.partner-01.social.linkedin.title",
        description: "Description of social",
        defaultMessage: "Linkdin",
      }),
      link: "https://linkedin.com",
      type: SocialType.LINKEDIN,
    },
    {
      id: "02",
      title: defineMessage({
        id: "partners.partner-01.social.youtube.title",
        description: "Description of social",
        defaultMessage: "Youtube",
      }),
      link: "https://youtube.com",
      type: SocialType.YOUTUBE,
    },
    {
      id: "03",
      title: defineMessage({
        id: "partners.partner-01.social.medium.title",
        description: "Description of social",
        defaultMessage: "medium",
      }),
      link: "https://medium.com",
      type: SocialType.MEDIUM,
    },
    {
      id: "04",
      title: defineMessage({
        id: "partners.partner-01.social.x.title",
        description: "Description of social",
        defaultMessage: "X",
      }),
      link: "https://x.com",
      type: SocialType.X,
    },
    {
      id: "05",
      title: defineMessage({
        id: "partners.partner-01.social.telegram.title",
        description: "Description of social",
        defaultMessage: "Telegram",
      }),
      link: "https://t.me",
      type: SocialType.TELEGRAM,
    },
    {
      id: "06",
      title: defineMessage({
        id: "partners.partner-01.social.discord.title",
        description: "Description of social",
        defaultMessage: "Discord",
      }),
      link: "https://discord.com",
      type: SocialType.DISCORD,
    },
  ],
};
