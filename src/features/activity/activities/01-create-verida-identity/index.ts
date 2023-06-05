import { defineMessage } from "react-intl";

import type { Activity } from "~/features/activity/types";

import { action } from "./action";

// TODO: Use uuid for id

export const activity: Activity = {
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
  actionExecutingLabel: defineMessage({
    id: "activities.createVeridaIdentity.actionExecutingLabel",
    defaultMessage: "Verifying...",
    description:
      "Label of the button when the activity 'create Verida Identity' is being executed",
  }),
  action: action,
  resources: [
    {
      label: "How to create a Verida Identity",
      url: "https://verida.io",
    },
  ],
};
