import { Activity } from "~/features/activities/types";

// TODO: Use uuid for id

export const activities: Activity[] = [
  {
    id: "create-verida-identity", // Never change the id
    order: 1,
    enabled: true,
    title: "Create a Verida Identity",
    shortDescription:
      "Download the Verida Wallet, create an identity and connect to this webapp",
  },
  {
    id: "update-profile", // Never change the id
    order: 2,
    enabled: true,
    title: "Update your profile",
    shortDescription: "Update your public name, avatar and description",
  },
  {
    id: "refer-friend", // Never change the id
    order: 3,
    enabled: true,
    title: "Refer a friend",
    shortDescription: "Get a friend to join the Verida Incentivized Testnet",
  },
  {
    id: "use-markdown-editor", // Never change the id
    order: 4,
    enabled: false,
    title: "Use the Markdown editor demo app",
    shortDescription: "Connect to the demo app and create a new document",
  },
  {
    id: "claim-polygon-id", // Never change the id
    order: 5,
    enabled: false,
    title: "Claim a Polygon ID credential",
    shortDescription:
      "Go to the Polygon ID issuer demo app and claim a KYC Age Credential",
  },
  {
    id: "claim-social-media-data", // Never change the id
    order: 6,
    enabled: false,
    title: "Claim your social media data",
    shortDescription:
      "Connect your Twitter account in the Verida Wallet and extract your data",
  },
].sort((a, b) => a.order - b.order);
