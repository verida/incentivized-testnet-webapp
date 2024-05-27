import { defineMessage } from "react-intl";

import type { Partner } from "~/features/activity/types";

export const PARTNER_02_ID = "partner-02";

export const partner: Partner = {
  id: PARTNER_02_ID,
  idLabel: defineMessage({
    id: "partners.partner-02.idLabel",
    defaultMessage: "zkPass",
    description: "Label of the partner id 02",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 2,
  title: defineMessage({
    id: "partners.partner-02.title",
    defaultMessage: "zkPass",
    description: "Title of the partner 02",
  }),
  shortDescription: defineMessage({
    id: "partners.partner-02.shortDescription",
    defaultMessage: "Activities from zkPass",
    description: "Short description of the partner 02",
  }),
  longDescription: defineMessage({
    id: "partners.partner-02.longDescription",
    defaultMessage: "Activities from zkPass",
    description: "Long description of the partner 02",
  }),
};
