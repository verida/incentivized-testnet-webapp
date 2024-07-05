import { defineMessage } from "react-intl";

import { Partner } from "~/features/partners/types";

export const PARTNER_ID_GAMER31 = "gamer31";

export const partner: Partner = {
  id: PARTNER_ID_GAMER31,
  visible: true,
  name: "Gamer31",
  description: defineMessage({
    id: "partners.gamer31.description",
    defaultMessage:
      "Gamer31 grant users unique identities derived from data extracted from renowned gaming and streaming platforms such as Steam, Twitch, and more. With innovative Polygon ID technology, players can prove eligibility in a privacy-preserving manner.",
    description: "Description of the partner gamer31",
  }),
  logo: "/images/partners/gamer31.svg",
  accentColor: "#FC0",
  accentForegoundColor: "dark",
  resources: [
    {
      label: defineMessage({
        id: "partners.gamer31.resources.website",
        description: "Label of the Gamer31 website",
        defaultMessage: "gamer31.com",
      }),
      url: "https://gamer31.com/",
    },
  ],
  socials: [],
};
