import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_02_ID = "mission-02";

export const mission: Mission = {
  id: MISSION_02_ID,
  idLabel: defineMessage({
    id: "missions.mission-02.idLabel",
    defaultMessage: "Mission 2",
    description: "Label of the mission id 02",
  }),
  enabled: false,
  visible: true,
  order: 2,
  title: defineMessage({
    id: "missions.mission-02.title",
    defaultMessage: "Leverage Credentials and Zero-Knowledge with Polygon ID",
    description: "Title of the mission 02",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-02.shortDescription",
    defaultMessage:
      "The Verida Wallet supports Polygon ID for the reception, holding of Verifiable Credentials (VC) that can then be presented in a privacy preserving way to third parties, via Zero-Knowledge Proof (ZKP). This mission will guide you through the process of claiming Polygon ID credentials.",
    description: "Short description of the mission 02",
  }),
};
