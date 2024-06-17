import { defineMessage } from "react-intl";

import type { Mission } from "~/features/missions/types";

export const MISSION_02_ID = "2";

export const mission: Mission = {
  id: MISSION_02_ID,
  idLabel: defineMessage({
    id: "missions.mission-02.idLabel",
    defaultMessage: "Mission 2",
    description: "Label of the mission id 02",
  }),
  enabled: true,
  frozen: false,
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
      "The Verida Wallet supports Polygon ID for receiving and storing Verifiable Credentials (VC), which can be presented in a privacy-preserving way to third parties via Zero-Knowledge Proofs (ZKP). This mission will guide you through the flow of using the Verida Wallet with various issuers and verifiers in the Polygon ID ecosystem.",
    description: "Short description of the mission 02",
  }),
  longDescription: defineMessage({
    id: "missions.mission-02.longDescription",
    defaultMessage:
      "The Verida Wallet supports Polygon ID for receiving and storing Verifiable Credentials (VC), which can be presented in a privacy-preserving way to third parties via Zero-Knowledge Proofs (ZKP). This mission will guide you through the flow of using the Verida Wallet with various issuers and verifiers in the Polygon ID ecosystem.",
    description: "Long description of the mission 02",
  }),
};
