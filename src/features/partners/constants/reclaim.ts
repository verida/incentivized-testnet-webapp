import { defineMessage } from "react-intl";

import { Partner, PartnerSocialType } from "~/features/partners/types";

export const PARTNER_ID_RECLAIM = "reclaim-protocol";

export const partner: Partner = {
  id: PARTNER_ID_RECLAIM,
  visible: false,
  name: "Reclaim Protocol",
  description: defineMessage({
    id: "partners.reclaim.description",
    defaultMessage:
      "Reclaim Protocol is a cryptographical digital notary, a solution designed to transform every website into an API",
    description: "Description of the partner Reclaim Protocol",
  }),
  logo: "/images/partners/reclaim.svg",
  resources: [
    {
      label: defineMessage({
        id: "partners.reclaim.resources.website",
        description: "Label of the Reclaim Protocol website",
        defaultMessage: "reclaimprotocol.org",
      }),
      url: "https://www.reclaimprotocol.org/",
    },
  ],
  socials: [
    {
      type: PartnerSocialType.X,
      url: "https://twitter.com/protocolreclaim",
    },
  ],
};
