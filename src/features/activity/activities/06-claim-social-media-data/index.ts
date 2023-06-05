import { defineMessage } from "react-intl";

import type { Activity } from "~/features/activity/types";

import { action } from "./action";

// TODO: Use uuid for id

export const activity: Activity = {
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
  actionExecutingLabel: defineMessage({
    id: "activities.claimSocialMediaData.actionExecutingLabel",
    defaultMessage: "Verifying...",
    description:
      "Label of the button when the activity 'claim social media data' is being executed",
  }),
  action: action,
};
