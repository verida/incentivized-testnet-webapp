import { defineMessage } from "react-intl";

import { Partner, PartnerSocialType } from "~/features/partners/types";

export const PARTNER_ID_RECLAIM = "reclaim-protocol";

export const partner: Partner = {
  id: PARTNER_ID_RECLAIM,
  visible: false,
  name: "Reclaim",
  description: defineMessage({
    id: "partners.reclaim.description",
    defaultMessage:
      "Reclaim Protocol is a cryptographical digital notary, a solution designed to transform every website into an API. It will empower users to manage and share their data, securely, anonymously and without any technical knowledge.The Reclaim Protocol aimed to revolutionize how individuals manage their digital footprint. From food delivery records to music playlists, gaming activity, document handling, financial transactions, and every other digital aspect of our lives – this data will now belong to its creators, the users.",
    description: "Description of the partner Reclaim Protocol",
  }),
  logo: "/images/partners/reclaim.svg",
  accentColor: "#0000ED",
  accentForegoundColor: "light",
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
