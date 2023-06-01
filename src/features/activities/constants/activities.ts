import { defineMessage } from "react-intl";

import { Activity } from "~/features/activities/types";

// TODO: Use uuid for id

export const activities: Activity[] = [
  {
    id: "create-verida-identity", // Never change the id
    enabled: true,
    visible: true,
    order: 1,
    title: "Create a Verida Identity",
    shortDescription:
      "Download the Verida Wallet, create an identity and connect to this webapp",
    actionLabel: defineMessage({
      id: "activities.createVeridaIdentity.actionLabel",
      defaultMessage: "Verify",
      description: "Label of the button to start the activity create identity",
    }),
  },
  {
    id: "update-profile", // Never change the id
    enabled: true,
    visible: true,
    order: 2,
    title: "Update your profile",
    shortDescription: "Update your public name, avatar and description",
    actionLabel: defineMessage({
      id: "activities.updateProfile.actionLabel",
      defaultMessage: "Verify",
      description: "Label of the button to start the activity update profile",
    }),
  },
  {
    id: "refer-friend", // Never change the id
    enabled: true,
    visible: true,
    order: 3,
    title: "Refer a friend",
    shortDescription: "Get a friend to join the Verida Incentivized Testnet",
    actionLabel: defineMessage({
      id: "activities.referFriend.actionLabel",
      defaultMessage: "Get Referal Link",
      description: "Label of the button to start the activity refer friend",
    }),
  },
  {
    id: "use-markdown-editor", // Never change the id
    enabled: false,
    visible: true,
    order: 4,
    title: "Use the Markdown editor demo app",
    shortDescription: "Connect to the demo app and create a new document",
    actionLabel: defineMessage({
      id: "activities.useMarkdownEditor.actionLabel",
      defaultMessage: "Verify",
      description:
        "Label of the button to start the activity use markdown editor",
    }),
  },
  {
    id: "claim-polygon-id", // Never change the id
    enabled: false,
    visible: true,
    order: 5,
    title: "Claim a Polygon ID credential",
    shortDescription:
      "Go to the Polygon ID issuer demo app and claim a KYC Age Credential",
    actionLabel: defineMessage({
      id: "activities.claimPolygonId.actionLabel",
      defaultMessage: "Verify",
      description: "Label of the button to start the activity claim polygon id",
    }),
  },
  {
    id: "claim-social-media-data", // Never change the id
    enabled: false,
    visible: true,
    order: 6,
    title: "Claim your social media data",
    shortDescription:
      "Connect your Twitter account in the Verida Wallet and extract your data",
    actionLabel: defineMessage({
      id: "activities.claimSocialMediaData.actionLabel",
      defaultMessage: "Verify",
      description:
        "Label of the button to start the activity claim social media data",
    }),
  },
].sort((a, b) => a.order - b.order);
