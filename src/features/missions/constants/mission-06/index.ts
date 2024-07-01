import { defineMessage } from "react-intl";

import type { Mission } from "~/features/missions/types";

export const MISSION_06_ID = "6";

export const mission: Mission = {
  id: MISSION_06_ID,
  idLabel: defineMessage({
    id: "missions.mission-06.idLabel",
    defaultMessage: "Mission 6",
    description: "Label of the mission id 06",
  }),
  enabled: true,
  visible: false,
  frozen: false,
  order: 6,
  title: defineMessage({
    id: "missions.mission-06.title",
    defaultMessage: "Generate proofs with Reclaim Protocol",
    description: "Title of the mission 06",
  }),
  description: defineMessage({
    id: "missions.mission-06.description",
    defaultMessage:
      "Reclaim protocol allows you to proof information about yourself from any website, without disclosing your personal data",
    description: "Short description of the mission 06",
  }),
  longDescription: defineMessage({
    id: "missions.mission-06.longDescription",
    defaultMessage:
      "Reclaim protocol allows you to proof information about yourself from any website, without disclosing your personal data",
    description: "Long description of the mission 06",
  }),
  resources: [],
};
