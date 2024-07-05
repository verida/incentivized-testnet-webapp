import { defineMessage } from "react-intl";

import { Partner, PartnerSocialType } from "~/features/partners/types";

export const PARTNER_ID_PRIVADOID = "privado-id";

export const partner: Partner = {
  id: PARTNER_ID_PRIVADOID,
  visible: true,
  name: "Privado ID",
  description: defineMessage({
    id: "partners.privadoid.description",
    defaultMessage:
      "Formerly Polygon ID, Privado ID is a set of tools for developers that can be used to facilitate trusted and secure relationships between apps and users. Developers can use Privado ID to enable the exchange of verifiable credentials secured by cryptography and the blockchain. Privado ID is designed for developers with a strong focus on privacy, decentralization and user data self-sovereignty.",
    description: "description of the partner Privado ID",
  }),
  logo: "/images/partners/privado-id.svg",
  accentColor: "#9AFE5B",
  accentForegoundColor: "dark",
  resources: [
    {
      label: defineMessage({
        id: "partners.privadoid.resources.website",
        description: "Label of the Privado ID website",
        defaultMessage: "privado.id",
      }),
      url: "https://www.privado.id/",
    },
  ],
  socials: [
    {
      type: PartnerSocialType.X,
      url: "https://x.com/PrivadoID",
    },
  ],
};
