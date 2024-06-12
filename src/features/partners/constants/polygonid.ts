import { defineMessage } from "react-intl";

import { Partner, SocialType } from "~/features/partners/types";

export const PARTNER_ID_POLYGONID = "polygonid";

export const partner: Partner = {
  id: PARTNER_ID_POLYGONID,
  idLabel: defineMessage({
    id: "partners.partner-polygonid.idLabel",
    defaultMessage: "Polygon ID",
    description: "Label of the partner polygon_id",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 1,
  title: defineMessage({
    id: "partners.partner-polygonid.title",
    defaultMessage: "Polygon",
    description: "Title of the partner polygon_id",
  }),
  shortDescription: defineMessage({
    id: "partners.partner-polygonid.shortDescription",
    defaultMessage: "Activities from Polygon",
    description: "Short description of the partner polygon_id",
  }),
  longDescription: defineMessage({
    id: "partners.partner-polygonid.longDescription",
    defaultMessage: "Activities from Polygon",
    description: "Long description of the partner polygon_id",
  }),
  image: "/images/partners/polygon.png",
  resources: [
    {
      label: defineMessage({
        id: "partners.partner-polygonid.resource.verida.title",
        description: "Description of resource",
        defaultMessage: "verida.network",
      }),
      url: "https://www.verida.network",
    },
    {
      label: defineMessage({
        id: "partners.partner-polygonid.resource.polygon.title",
        description: "Description of resource",
        defaultMessage: "polygonscan.io",
      }),
      url: "https://www.polygonscan.io",
    },
  ],
  socials: [
    {
      id: "polygon_id",
      title: defineMessage({
        id: "partners.partner-polygonid.social.linkedin.title",
        description: "Description of social",
        defaultMessage: "Linkdin",
      }),
      link: "https://linkedin.com",
      type: SocialType.LINKEDIN,
    },
    {
      id: "02",
      title: defineMessage({
        id: "partners.partner-polygonid.social.youtube.title",
        description: "Description of social",
        defaultMessage: "Youtube",
      }),
      link: "https://youtube.com",
      type: SocialType.YOUTUBE,
    },
    {
      id: "03",
      title: defineMessage({
        id: "partners.partner-polygonid.social.medium.title",
        description: "Description of social",
        defaultMessage: "medium",
      }),
      link: "https://medium.com",
      type: SocialType.MEDIUM,
    },
    {
      id: "04",
      title: defineMessage({
        id: "partners.partner-polygonid.social.x.title",
        description: "Description of social",
        defaultMessage: "X",
      }),
      link: "https://x.com",
      type: SocialType.X,
    },
    {
      id: "05",
      title: defineMessage({
        id: "partners.partner-polygonid.social.telegram.title",
        description: "Description of social",
        defaultMessage: "Telegram",
      }),
      link: "https://t.me",
      type: SocialType.TELEGRAM,
    },
    {
      id: "06",
      title: defineMessage({
        id: "partners.partner-polygonid.social.discord.title",
        description: "Description of social",
        defaultMessage: "Discord",
      }),
      link: "https://discord.com",
      type: SocialType.DISCORD,
    },
  ],
};
