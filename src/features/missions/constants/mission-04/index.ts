import { defineMessage } from "react-intl";

import type { Mission } from "~/features/missions/types";

export const MISSION_04_ID = "mission-04";

export const mission: Mission = {
  id: MISSION_04_ID,
  idLabel: defineMessage({
    id: "missions.mission-04.idLabel",
    defaultMessage: "Mission 4",
    description: "Label of the mission id 04",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 4,
  title: defineMessage({
    id: "missions.mission-04.title",
    defaultMessage:
      "Prove Your Humanity and Build Trusted Online Communities with Synaps Proof of Life Credential",
    description: "Title of the mission 04",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-04.shortDescription",
    defaultMessage:
      "Embrace the future of secure and authentic online interactions by claiming your Proof of Life with Polygon ID. This mission, in partnership with Synaps, empowers individuals to assert their humanity while upholding their privacy.",
    description: "Short description of the mission 04",
  }),
  longDescription: defineMessage({
    id: "missions.mission-04.longDescription",
    defaultMessage:
      "Embrace the future of secure and authentic online interactions by claiming your Proof of Life with Polygon ID. This mission, in partnership with Synaps, empowers individuals to assert their humanity while upholding their privacy.",
    description: "Long description of the mission 04",
  }),
};
