import { defineMessage } from "react-intl";

import { Partner, SocialType } from "~/features/partners/types";

export const PARTNER_ID_ZKPASS = "zkpass";

export const partner: Partner = {
  id: PARTNER_ID_ZKPASS,
  idLabel: defineMessage({
    id: "partners.partner-id-zkpass.idLabel",
    defaultMessage: "zkPass",
    description: "Label of the partner id partnerid-zk-pass",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 1,
  title: defineMessage({
    id: "partners.partner-id-zkpass.title",
    defaultMessage: "zkPass",
    description: "Title of the zkPass",
  }),
  shortDescription: defineMessage({
    id: "partners.partner-id-zkpass.shortDescription",
    defaultMessage: "Activities from zkPass",
    description: "Short description of the partner zkPass",
  }),
  longDescription: defineMessage({
    id: "partners.partner-id-zkpass.longDescription",
    defaultMessage: "Activities from zkPass",
    description: "Long description of the partner zkPass",
  }),
  image: "/images/partners/zkPass.png",
  resources: [
    {
      label: defineMessage({
        id: "partners.partner-id-zkpass.resource.verida.title",
        description: "Description of resource",
        defaultMessage: "verida.network",
      }),
      url: "https://www.verida.network",
    },
    {
      label: defineMessage({
        id: "partners.partner-id-zkpass.resource.zkPass.title",
        description: "Description of resource",
        defaultMessage: "zkpass.org",
      }),
      url: "https://www.zkpass.org",
    },
  ],
  socials: [
    {
      id: "partnerid-zk-pass",
      title: defineMessage({
        id: "partners.partner-id-zkpass.social.linkedin.title",
        description: "Description of social",
        defaultMessage: "Linkdin",
      }),
      link: "https://linkedin.com",
      type: SocialType.LINKEDIN,
    },
    {
      id: "partnerid-zk-pass",
      title: defineMessage({
        id: "partners.partner-id-zkpass.social.youtube.title",
        description: "Description of social",
        defaultMessage: "Youtube",
      }),
      link: "https://youtube.com",
      type: SocialType.YOUTUBE,
    },
    {
      id: "03",
      title: defineMessage({
        id: "partners.partner-id-zkpass.social.medium.title",
        description: "Description of social",
        defaultMessage: "medium",
      }),
      link: "https://medium.com",
      type: SocialType.MEDIUM,
    },
    {
      id: "04",
      title: defineMessage({
        id: "partners.partner-id-zkpass.social.x.title",
        description: "Description of social",
        defaultMessage: "X",
      }),
      link: "https://x.com",
      type: SocialType.X,
    },
    {
      id: "05",
      title: defineMessage({
        id: "partners.partner-id-zkpass.social.telegram.title",
        description: "Description of social",
        defaultMessage: "Telegram",
      }),
      link: "https://t.me",
      type: SocialType.TELEGRAM,
    },
    {
      id: "06",
      title: defineMessage({
        id: "partners.partner-id-zkpass.social.discord.title",
        description: "Description of social",
        defaultMessage: "Discord",
      }),
      link: "https://discord.com",
      type: SocialType.DISCORD,
    },
  ],
};
