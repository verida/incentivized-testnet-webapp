import { defineMessage } from "react-intl";

import type { Mission } from "~/features/missions/types";

export const MISSION_01_ID = "mission-01";

export const mission: Mission = {
  id: MISSION_01_ID,
  idLabel: defineMessage({
    id: "missions.mission-01.idLabel",
    defaultMessage: "Mission 1",
    description: "Label of the mission if 01",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 1,
  title: defineMessage({
    id: "missions.mission-01.title",
    defaultMessage: "Onboarding to the Verida Network",
    description: "Title of the mission 01",
  }),
  longDescription: defineMessage({
    id: "missions.mission-01.longDescription",
    defaultMessage:
      "This first mission guides you through setting up your identity, exploring demo apps, and introducing you to the Verida Network.",
    description: "Long description of the mission 01",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-01.shortDescription",
    defaultMessage:
      "This first mission guides you through setting up your identity, exploring demo apps, and introducing you to the Verida Network.{newline}{newline}Get Started:{newline}1. Click the 'Connect' button above{newline}2. Depending on being on mobile or desktop, either click the button, or scan the QR code with your phone{newline}3. Follow the instructions to install the Wallet and create your Identity{newline}4. You may have to refresh this page and connect again",
    description: "Short description of the mission 01",
  }),
  resources: [
    {
      label: defineMessage({
        id: "missions.mission-01.resources.walletGuideblogPost.label",
        defaultMessage:
          "Blog: Verida Wallet - The Ultimate Guide to Getting Started",
        description: "Label of the wallet guide blog post resource",
      }),
      url: "https://news.verida.io/verida-wallet-the-ultimate-guide-to-getting-started-998a01cc68b7",
    },
    {
      label: defineMessage({
        id: "missions.mission-01.resources.howToCreateVeridaIdentity.label",
        defaultMessage: "User Guide: How to create a Verida Identity",
        description: "Label of the resource 'How to create a Verida Identity'",
      }),
      url: "https://community.verida.io/user-guides/create-a-verida-identity-guide",
    },
    {
      label: defineMessage({
        id: "missions.mission-01.resources.howToCreateVeridaIdentityVideo.label",
        defaultMessage: "Video: How to create a Verida Identity",
        description:
          "Label of the resource 'How to create a Verida Identity' video",
      }),
      url: "https://youtu.be/Iav2TRzBiIs",
    },
    {
      label: defineMessage({
        id: "missions.mission-01.resources.walletInstallLink.label",
        defaultMessage: "Install the Verida Wallet (iOS and Android)",
        description: "Label of the wallet install url resource",
      }),
      url: "https://vault.verida.io/",
    },
  ],
};
