import { toast } from "react-hot-toast";
import { defineMessage } from "react-intl";

import { MISSION_01_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
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
  shortDescription: defineMessage({
    id: "activities.createVeridaIdentity.shortDescription",
    defaultMessage:
      "Verida identities are an implementation of the Decentralized Identifier (DID) Standard from the W3C. A DID has a unique address (e.g. did:vda:mainnet:0x6B2...a6F) that is controlled by an end user with a private key or seed phrase. A user can verify themselves to another user, entity or application by sharing their unique DID address.",
    description: "Short description of the activity 'create identity'",
  }),
  longDescription: defineMessage({
    id: "activities.createVeridaIdentity.longDescription",
    defaultMessage:
      "Verida identities are an implementation of the Decentralized Identifier (DID) Standard from the W3C. A DID has a unique address (e.g. did:vda:mainnet:0x6B2...a6F) that is controlled by an end user with a private key or seed phrase. A user can verify themselves to another user, entity or application by sharing their unique DID address.",
    description: "Long description of the activity 'create identity'",
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
};
