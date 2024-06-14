import { defineMessage } from "react-intl";

import { Partner, PartnerSocialType } from "~/features/partners/types";

export const PARTNER_ID_SYNAPS = "synaps";

export const partner: Partner = {
  id: PARTNER_ID_SYNAPS,
  visible: true,
  name: "Synaps",
  description: defineMessage({
    id: "partners.synaps.description",
    defaultMessage: "Synaps provides identity verification solutions",
    description: "Description of the partner synaps",
  }),
  logo: "/images/partners/synaps.png",
  resources: [
    {
      label: defineMessage({
        id: "partners.synaps.resources.website",
        description: "Label of the Synaps website",
        defaultMessage: "synaps.io",
      }),
      url: "https://www.synaps.io/",
    },
  ],
  socials: [
    {
      type: PartnerSocialType.X,
      url: "https://twitter.com/synaps_id",
    },
  ],
};
