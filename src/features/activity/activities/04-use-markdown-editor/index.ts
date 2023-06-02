import { defineMessage } from "react-intl";

import type { Activity } from "~/features/activity/types";

import { action } from "./action";

// TODO: Use uuid for id

export const activity: Activity = {
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
  action: action,
};
