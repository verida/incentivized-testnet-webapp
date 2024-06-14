import { defineMessage } from "react-intl";

import { Partner, PartnerSocialType } from "~/features/partners/types";

export const PARTNER_ID_POLYGONID = "polygonid";

export const partner: Partner = {
  id: PARTNER_ID_POLYGONID,
  visible: true,
  name: "Polygon ID",
  description: defineMessage({
    id: "partners.polygonid.description",
    defaultMessage:
      "Polygon ID gives you the power to build trusted and secure relationships between users and dApps.",
    description: "description of the partner Polygon ID",
  }),
  logo: "/images/partners/polygonid.png",
  accentColor: "#8343F3",
  accentForegoundColor: "light",
  resources: [
    {
      label: defineMessage({
        id: "partners.polygonid.resources.website",
        description: "Label of the Polygon ID website",
        defaultMessage: "polygon.technology/polygon-id",
      }),
      url: "https://polygon.technology/polygon-id",
    },
  ],
  socials: [
    {
      type: PartnerSocialType.X,
      url: "https://twitter.com/0xPolygonLabs",
    },
  ],
};
