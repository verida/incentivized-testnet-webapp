import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_05_ID = "mission-05";

export const mission: Mission = {
  id: MISSION_05_ID,
  idLabel: defineMessage({
    id: "missions.mission_05.idLabel",
    defaultMessage: "Mission 5",
    description: "Label of the mission id 05",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 5,
  title: defineMessage({
    id: "missions.mission_05.title",
    defaultMessage: "Generate proofs with Reclaim Protocol",
    description: "Title of the mission 05",
  }),
  shortDescription: defineMessage({
    id: "missions.mission_05.shortDescription",
    defaultMessage:
      "Reclaim protocol allows you to proof information about yourself from any website, without disclosing your personal data",
    description: "Short description of the mission 05",
  }),
  longDescription: defineMessage({
    id: "missions.mission_05.longDescription",
    defaultMessage:
      "Reclaim protocol allows you to proof information about yourself from any website, without disclosing your personal data",
    description: "Long description of the mission 05",
  }),
};
