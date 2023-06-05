import { defineMessage } from "react-intl";

import type { Activity } from "~/features/activity/types";

import { action } from "./action";

// TODO: Use uuid for id

export const activity: Activity = {
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
  actionExecutingLabel: defineMessage({
    id: "activities.referFriend.actionExecutingLabel",
    defaultMessage: "Preparing...",
    description:
      "Label of the button when the activity 'refer friend' is being executed",
  }),
  action: action,
};
