import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_05_ID = "mission-05";

export const mission: Mission = {
  id: MISSION_05_ID,
  idLabel: defineMessage({
    id: "missions.mission-05.idLabel",
    defaultMessage: "Mission 5",
    description: "Label of the mission id 05",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 5,
  title: defineMessage({
    id: "missions.mission-05.title",
    defaultMessage: "Generate CEX proofs with zkPass protocol",
    description: "Title of the mission 05",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-05.shortDescription",
    defaultMessage: `zkPass is a private data protocol that enables privacy-preserving verification.{newline}{newline} It is built on the foundation of Multi-Party Computation (MPC), Zero-Knowledge Proofs (ZKP), and three-party Transport Layer Security (3P-TLS).{newline}{newline}zkPass protocol allows you to prove information about yourself from any supported service without disclosing personal data.{newline}{newline}If you have an existing account on centralized exchanges (CEX), you can prove ownership and claim a credential`,
    description: "Short description of the mission 05",
  }),
  longDescription: defineMessage({
    id: "missions.mission-05.longDescription",
    defaultMessage: `zkPass is a private data protocol that enables privacy-preserving verification. It is built on the foundation of Multi-Party Computation (MPC), Zero-Knowledge Proofs (ZKP), and three-party Transport Layer Security (3P-TLS).{newline}{newline}zkPass protocol allows you to prove information about yourself from any supported service without disclosing personal data.{newline}{newline} If you have an existing account on centralized exchanges (CEX), you can prove ownership and claim a credential.`,
    description: "Long description of the mission 05",
  }),
};
