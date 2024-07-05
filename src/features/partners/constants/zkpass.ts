import { defineMessage } from "react-intl";

import { Partner, PartnerSocialType } from "~/features/partners/types";

export const PARTNER_ID_ZKPASS = "zkpass";

export const partner: Partner = {
  id: PARTNER_ID_ZKPASS,
  visible: true,
  name: "zkPass",
  description: defineMessage({
    id: "partners.zkpass.description",
    defaultMessage:
      "zkPass provides TransGate, which enables users to selectively and privately validate their data on any HTTPS website to the web3 world without the need to disclose or upload any sensitive personal data to third parties. It can cover various data types such as legal identity, financial records, healthcare information, social interactions, work experience, education and skill certifications, etc.",
    description: "Description of the partner zkPass",
  }),
  logo: "/images/partners/zkPass.png",
  accentColor: "#C5FF4A",
  accentForegoundColor: "dark",
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
