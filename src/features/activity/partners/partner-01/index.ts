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
    defaultMessage: "Polygon",
    description: "Title of the partner 01",
  }),
  shortDescription: defineMessage({
    id: "partners.partner-01.shortDescription",
    defaultMessage: "Activities from Polygon",
    description: "Short description of the partner 01",
  }),
  longDescription: defineMessage({
    id: "partners.partner-01.longDescription",
    defaultMessage: "Activities from Polygon",
    description: "Long description of the partner 01",
  }),
};
