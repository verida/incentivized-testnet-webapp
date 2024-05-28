import { defineMessage } from "react-intl";

import { type Partner, SocialType } from "~/features/activity/types";

export const PARTNER_02_ID = "partner-02";

export const partner: Partner = {
  id: PARTNER_02_ID,
  idLabel: defineMessage({
    id: "partners.partner-02.idLabel",
    defaultMessage: "zkPass",
    description: "Label of the partner id 02",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 1,
  title: defineMessage({
    id: "partners.partner-02.title",
    defaultMessage: "zkPass",
    description: "Title of the partner 02",
  }),
  shortDescription: defineMessage({
    id: "partners.partner-02.shortDescription",
    defaultMessage: "Activities from zkPass",
    description: "Short description of the partner 02",
  }),
  longDescription: defineMessage({
    id: "partners.partner-02.longDescription",
    defaultMessage: "Activities from zkPass",
    description: "Long description of the partner 02",
  }),
  image: "/images/partners/zkPass.png",
  resources: [
    {
      label: defineMessage({
        id: "partners.partner-02.resource.verida.title",
        description: "Description of resource",
        defaultMessage: "verida.network",
      }),
      url: "https://www.verida.network",
    },
    {
      label: defineMessage({
        id: "partners.partner-02.resource.zkPass.title",
        description: "Description of resource",
        defaultMessage: "zkpass.org",
      }),
      url: "https://www.zkpass.org",
    },
  ],
  socials: [
    {
      id: "02",
      title: defineMessage({
        id: "partners.partner-02.social.linkedin.title",
        description: "Description of social",
        defaultMessage: "Linkdin",
      }),
      link: "https://linkedin.com",
      type: SocialType.LINKEDIN,
    },
    {
      id: "02",
      title: defineMessage({
        id: "partners.partner-02.social.youtube.title",
        description: "Description of social",
        defaultMessage: "Youtube",
      }),
      link: "https://youtube.com",
      type: SocialType.YOUTUBE,
    },
    {
      id: "03",
      title: defineMessage({
        id: "partners.partner-02.social.medium.title",
        description: "Description of social",
        defaultMessage: "medium",
      }),
      link: "https://medium.com",
      type: SocialType.MEDIUM,
    },
    {
      id: "04",
      title: defineMessage({
        id: "partners.partner-02.social.x.title",
        description: "Description of social",
        defaultMessage: "X",
      }),
      link: "https://x.com",
      type: SocialType.X,
    },
    {
      id: "05",
      title: defineMessage({
        id: "partners.partner-02.social.telegram.title",
        description: "Description of social",
        defaultMessage: "Telegram",
      }),
      link: "https://t.me",
      type: SocialType.TELEGRAM,
    },
    {
      id: "06",
      title: defineMessage({
        id: "partners.partner-02.social.discord.title",
        description: "Description of social",
        defaultMessage: "Discord",
      }),
      link: "https://discord.com",
      type: SocialType.DISCORD,
    },
  ],
};
