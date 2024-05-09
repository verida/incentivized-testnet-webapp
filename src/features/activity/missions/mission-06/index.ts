import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_06_ID = "mission-06";

export const mission: Mission = {
  id: MISSION_06_ID,
  idLabel: defineMessage({
    id: "missions.mission_06.idLabel",
    defaultMessage: "Mission 5",
    description: "Label of the mission id 06",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 5,
  title: defineMessage({
    id: "missions.mission_06.title",
    defaultMessage: "Generate CEX proofs with zkPass protocol",
    description: "Title of the mission 06",
  }),
  shortDescription: defineMessage({
    id: "missions.mission_06.shortDescription",
    defaultMessage:
      "zkPass protocol allows you to proof information about yourself from any website, without disclosing your personal data",
    description: "Short description of the mission 06",
  }),
  longDescription: defineMessage({
    id: "missions.mission_06.longDescription",
    defaultMessage: `zkPass is a private data protocol that enables privacy-preserving verification. It is built on the foundation of Multi-Party Computation (MPC), Zero-Knowledge Proofs (ZKP), and three-party Transport Layer Security (3P-TLS).

      zkPass protocol allows you to prove information about yourself from any supported service without disclosing personal data.
      
      If you have an existing account on centralized exchanges (CEX), you can prove ownership and claim a credential. 
      `,
    description: "Long description of the mission 06",
  }),
};
