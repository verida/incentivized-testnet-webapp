import { defineMessage } from "react-intl";

import type { Partner } from "~/features/activity/types";

export const PARTNER_01_ID = "partner-01";

export const partner: Partner = {
  id: PARTNER_01_ID,
  idLabel: defineMessage({
    id: "partners.partner-01.idLabel",
    defaultMessage: "Polygon",
    description: "Label of the partner id 01",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 1,
  title: defineMessage({
    id: "partners.partner-01.title",
    defaultMessage:
      "Prove Your Humanity and Build Trusted Online Communities with Synaps Proof of Life Credential",
    description: "Title of the partner 01",
  }),
  shortDescription: defineMessage({
    id: "partners.partner-01.shortDescription",
    defaultMessage:
      "Embrace the future of secure and authentic online interactions by claiming your Proof of Life with Polygon ID. This mission, in partnership with Synaps, empowers individuals to assert their humanity while upholding their privacy.",
    description: "Short description of the partner 01",
  }),
  longDescription: defineMessage({
    id: "partners.partner-01.longDescription",
    defaultMessage:
      "Embrace the future of secure and authentic online interactions by claiming your Proof of Life with Polygon ID. This mission, in partnership with Synaps, empowers individuals to assert their humanity while upholding their privacy.",
    description: "Long description of the partner 01",
  }),
};
