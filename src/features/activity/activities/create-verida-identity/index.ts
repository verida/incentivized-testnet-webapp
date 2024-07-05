import { toast } from "react-hot-toast";
import { defineMessage } from "react-intl";

import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { MISSION_01_ID } from "~/features/missions";
import { wait } from "~/utils";

const logger = new Logger("activity");

const ACTIVITY_ID = "create-verida-identity"; // Never change the id

const handleInit: ActivityOnInit = async (
  veridaWebUser,
  userActivity,
  saveActivity
) => {
  if (userActivity?.status === "completed") {
    logger.debug("Activity already completed, no initialisation needed", {
      activityId: ACTIVITY_ID,
    });
    return () => Promise.resolve();
  }

  const { status } = await handleExecute(veridaWebUser);
  try {
    await saveActivity({ id: ACTIVITY_ID, status });
    // TODO: Find a way to localised this message (can't use useIntl as not in a hook, may have to pass the i18n object as arg)
    toast.success("Congrats, you have completed the activity");
  } catch (_error: unknown) {
    // No need to capture the error with Sentry as it has been captured by the mutation error handler ... normally
  }
  return () => Promise.resolve();
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  logger.debug("Executing activity", { activityId: ACTIVITY_ID });

  const isConnected = veridaWebUser.current.isConnected();
  if (isConnected) {
    return { status: "completed" };
  }
  // Wait a bit for UX purposes or the user will think nothing happened
  await wait(2000);
  return { status: "todo" };
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_01_ID,
  enabled: true,
  ended: false,
  visible: true,
  order: 1,
  points: 100,
  partners: [],
  title: defineMessage({
    id: "activities.createVeridaIdentity.title",
    defaultMessage: "Create a Verida Identity",
    description: "Title of the activity 'create identity'",
  }),
  description: defineMessage({
    id: "activities.createVeridaIdentity.description",
    defaultMessage:
      "Verida identities are an implementation of the Decentralized Identifier (DID) Standard from the W3C. A DID has a unique address (e.g. did:vda:mainnet:0x6B2...a6F) that is controlled by an end user with a private key or seed phrase. A user can verify themselves to another user, entity or application by sharing their unique DID address.",
    description: "Description of the activity 'create identity'",
  }),
  actionLabel: defineMessage({
    id: "activities.createVeridaIdentity.actionLabel",
    defaultMessage: "Verify",
    description: "Label of the button to start the activity create identity",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.createVeridaIdentity.actionExecutingLabel",
    defaultMessage: "Verifying",
    description:
      "Label of the button when the activity 'create Verida Identity' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  steps: [
    {
      order: 1,
      description: defineMessage({
        id: "activities.createVeridaIdentity.steps.1.description",
        defaultMessage: "Click the 'Connect' button above.",
        description: "Step 1 of the activity 'create Verida Identity'",
      }),
    },
    {
      order: 2,
      description: defineMessage({
        id: "activities.createVeridaIdentity.step2.description",
        defaultMessage:
          "Depending on being on mobile or desktop, either click the button, or scan the QR code with your phone.",
        description: "Step 2 of the activity 'create Verida Identity'",
      }),
    },
    {
      order: 3,
      description: defineMessage({
        id: "activities.createVeridaIdentity.step3.description",
        defaultMessage:
          "Follow the instructions to install the Wallet app and create your Identity.",
        description: "Step 3 of the activity 'create Verida Identity'",
      }),
    },
    {
      order: 4,
      description: defineMessage({
        id: "activities.createVeridaIdentity.step4.description",
        defaultMessage: "You may have to refresh this page and connect again.",
        description: "Step 4 of the activity 'create Verida Identity'",
      }),
    },
    {
      order: 5,
      description: defineMessage({
        id: "activities.createVeridaIdentity.step5.description",
        defaultMessage: "This activity will automatically complete.",
        description: "Step 5 of the activity 'create Verida Identity'",
      }),
    },
  ],
};
