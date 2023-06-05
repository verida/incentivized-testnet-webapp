import { defineMessage } from "react-intl";

import type { Activity } from "~/features/activity/types";

import { action } from "./action";

// TODO: Use uuid for id

export const activity: Activity = {
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
  action: action,
  resources: [
    {
      label: "How to update your Verida Identity profile",
      url: "https://verida.io",
    },
  ],
};
