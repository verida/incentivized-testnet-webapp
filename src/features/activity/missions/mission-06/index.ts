import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_06_ID = "mission-06";

export const mission: Mission = {
  id: MISSION_06_ID,
  idLabel: defineMessage({
    id: "missions.mission_06.idLabel",
    defaultMessage: "Mission 6",
    description: "Label of the mission id 06",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 5,
  title: defineMessage({
    id: "missions.mission_06.title",
    defaultMessage: "Generate CEX proofs with ZkPass Protocol",
    description: "Title of the mission 06",
  }),
  shortDescription: defineMessage({
    id: "missions.mission_06.shortDescription",
    defaultMessage:
      "ZkPass protocol allows you to proof information about yourself from any website, without disclosing your personal data",
    description: "Short description of the mission 06",
  }),
  longDescription: defineMessage({
    id: "missions.mission_06.longDescription",
    defaultMessage:
      "ZkPass protocol allows you to proof information about yourself from any website, without disclosing your personal data",
    description: "Long description of the mission 06",
  }),
};
