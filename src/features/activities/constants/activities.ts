import { Activity } from "~/features/activities/types";

export const activities: Activity[] = [
  {
    id: "1", // Never change the id
    enabled: true,
    title: "Create a Verida Identity",
    shortDescription:
      "Download the Verida Wallet, create an identity and connect to this webapp",
  },
  {
    id: "2", // Never change the id
    enabled: true,
    title: "Update your profile",
    shortDescription: "Update your public name, avatar and description",
  },
  {
    id: "3", // Never change the id
    enabled: true,
    title: "Refer a friend",
    shortDescription: "Get a friend to join the Verida Incentivized Testnet",
  },
  {
    id: "4", // Never change the id
    enabled: false,
    title: "Use the Markdown editor demo app",
    shortDescription: "Connect to the demo app and create a new document",
  },
  {
    id: "5", // Never change the id
    enabled: false,
    title: "Claim a Polygon ID credential",
    shortDescription:
      "Go to the Polygon ID issuer demo app and claim a KYC Age Credential",
  },
  {
    id: "6", // Never change the id
    enabled: false,
    title: "Claim your social media data",
    shortDescription:
      "Connect your Twitter account in the Verida Wallet and extract your data",
  },
];
