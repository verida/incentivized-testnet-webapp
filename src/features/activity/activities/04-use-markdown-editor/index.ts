import { defineMessage } from "react-intl";

import { MISSION_01_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnUnmount,
} from "~/features/activity/types";
import { wait } from "~/utils";

const ACTIVITY_ID = "use-markdown-editor"; // Never change the id

const handleInit: ActivityOnInit = () => {
  return Promise.resolve();
};

const handleExecute: ActivityOnExecute = async (_veridaWebUser) => {
  await wait(5000);
  return { status: "pending" };
};

const handleUnmount: ActivityOnUnmount = async (_veridaWebUser) => {
  return Promise.resolve();
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_01_ID,
  enabled: false,
  visible: false,
  order: 4,
  title: defineMessage({
    id: "activities.useMarkdownEditor.title",
    defaultMessage: "Use the Markdown editor demo app",
    description: "Title of the activity 'use markdown editor'",
  }),
  shortDescription: defineMessage({
    id: "activities.useMarkdownEditor.shortDescription",
    defaultMessage: "Connect to the demo app and create a new document",
    description: "Short description of the activity 'use markdown editor'",
  }),
  actionLabel: defineMessage({
    id: "activities.useMarkdownEditor.actionLabel",
    defaultMessage: "Verify",
    description:
      "Label of the button to start the activity use markdown editor",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.useMarkdownEditor.actionExecutingLabel",
    defaultMessage: "Verifying...",
    description:
      "Label of the button when the activity 'use markdown editor is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onUnmount: handleUnmount,
};
