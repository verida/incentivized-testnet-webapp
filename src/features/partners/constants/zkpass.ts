import { defineMessage } from "react-intl";

import { Partner, PartnerSocialType } from "~/features/partners/types";

export const PARTNER_ID_ZKPASS = "zkpass";

export const partner: Partner = {
  id: PARTNER_ID_ZKPASS,
  visible: true,
  name: "zkPass",
  description: defineMessage({
    id: "partners.zkpass.description",
    defaultMessage: "Protocol for private Data based on MPC, ZKP, 3P-TLS",
    description: "Description of the partner zkPass",
  }),
  logo: "/images/partners/zkPass.png",
  resources: [
    {
      label: defineMessage({
        id: "partners.zkpass.resources.website",
        description: "Label of the zkPass website",
        defaultMessage: "zkpass.org",
      }),
      url: "https://www.zkpass.org",
    },
  ],
  socials: [
    {
      type: PartnerSocialType.X,
      url: "https://twitter.com/zkPass",
    },
  ],
};
