import { defineMessage } from "react-intl";

import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { MISSION_01_ID } from "~/features/missions";
import { Sentry } from "~/features/sentry";
import { wait } from "~/utils";

const logger = new Logger("activity");

const ACTIVITY_ID = "use-markdown-editor"; // Never change the id

const MARKDOWN_EDITOR_CONTEXT_NAME = "Verida: Markdown Notes Demo";

const handleInit: ActivityOnInit = () => {
  logger.debug("No initialisation needed", {
    activityId: ACTIVITY_ID,
  });
  return Promise.resolve(() => Promise.resolve());
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  logger.debug("Executing activity", { activityId: ACTIVITY_ID });

  // Wait a bit for UX purposes
  await wait(2000);

  try {
    const did = veridaWebUser.current.getDid();
    const client = veridaWebUser.current.getClient();
    const didDocument = await client.didClient.get(did);
    const contextProof = didDocument.locateContextProof(
      MARKDOWN_EDITOR_CONTEXT_NAME
    );

    if (contextProof) {
      return { status: "completed" };
    }

    const markdownEditorNotUsedErrorMessage = defineMessage({
      id: "activities.useMarkdownEditor.markdownEditorNotUsedErrorMessage",
      defaultMessage: `Looks like you haven't used the Markdown Editor demo app yet, please use it and check this activity again`,
      description:
        "Error message when the user haven't used the Markdown Editor yet.",
    });

    return {
      status: "todo",
      message: markdownEditorNotUsedErrorMessage,
    };
  } catch (error: unknown) {
    Sentry.captureException(error);
    const executionErrorMessage = defineMessage({
      id: "activities.useMarkdownEditor.executionErrorMessage",
      defaultMessage: `There was an error while checking this activity, please try again later`,
      description: "Error message when we are not able to check the activity",
    });

    return {
      status: "todo",
      message: executionErrorMessage,
    };
  }
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_01_ID,
  enabled: true,
  ended: false,
  visible: true,
  order: 3,
  points: 50,
  partners: [],
  title: defineMessage({
    id: "activities.useMarkdownEditor.title",
    defaultMessage: "Use the Markdown Editor demo app",

    description: "Title of the activity 'use markdown editor'",
  }),
  description: defineMessage({
    id: "activities.useMarkdownEditor.description",
    defaultMessage:
      "With the Markdown Editor demo app, you can create notes with markdown formatting. Notes are encrypted and securely stored in your Verida self-sovereign datastore.{newline}Note: this app is for demonstration purposes only.",
    description: "Description of the activity 'use markdown editor'",
  }),
  actionLabel: defineMessage({
    id: "activities.useMarkdownEditor.actionLabel",
    defaultMessage: "Check",
    description:
      "Label of the button to start the activity use markdown editor",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.useMarkdownEditor.actionExecutingLabel",
    defaultMessage: "Checking",
    description:
      "Label of the button when the activity 'use markdown editor is being executed",
  }),
  steps: [
    {
      order: 1,
      description: defineMessage({
        id: "activities.useMarkdownEditor.step1.description",
        defaultMessage:
          "Connect to the Markdown Editor demo app (link in resources) and create a new note.",
        description: "Step 1 of the activity 'use markdown editor'",
      }),
    },
    {
      order: 2,
      description: defineMessage({
        id: "activities.useMarkdownEditor.step2.description",
        defaultMessage:
          "Once you've created a note, click the 'Verify' button below.",
        description: "Step 2 of the activity 'use markdown editor'",
      }),
    },
  ],
  resources: [
    {
      label: defineMessage({
        id: "activities.useMarkdownEditor.resources.markdownEditorDemoAppUrl.label",
        defaultMessage: "Markdown Editor demo app",
        description: "Label of the resource 'Markdown Editor demo app'",
      }),
      url: "https://markdown-editor.demos.verida.io",
    },
    {
      label: defineMessage({
        id: "activities.useMarkdownEditor.resources.HowToUseTheMarkdownEditorDemoApp.label",
        defaultMessage: "User Guide: How to use the Markdown Editor demo app",
        description:
          "Label of the resource 'How to use the Markdown Editor demo app'",
      }),
      url: "https://community.verida.io/user-guides/using-the-verida-markdown-editor-demo",
    },
    {
      label: defineMessage({
        id: "activities.useMarkdownEditor.resources.HowToUseTheMarkdownEditorDemoAppVideo.label",
        defaultMessage: "Video: How to use the Markdown Editor demo app",
        description:
          "Label of the resource 'How to use the Markdown Editor demo app' video",
      }),
      url: "https://youtu.be/su_03ZBzhig",
    },
  ],
  video: {
    label: defineMessage({
      id: "activities.useMarkdownEditor.video.label",
      defaultMessage: "How to use the Markdown Editor demo app",
      description:
        "Label of the video 'How to use the Markdown Editor demo app'",
    }),
    url: "https://youtu.be/su_03ZBzhig",
  },
  onInit: handleInit,
  onExecute: handleExecute,
};
