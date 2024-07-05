import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnMessage,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { MISSION_03_ID } from "~/features/missions";
import { PARTNER_ID_GAMER31, PARTNER_ID_PRIVADOID } from "~/features/partners";
import { Sentry } from "~/features/sentry";
import {
  type ReceivedMessage,
  VAULT_CREDENTIAL_SCHEMA_URL,
  getMessaging,
  sendDataRequest,
} from "~/features/verida";

import { GAMER31_LICHESS_VC_SCHEMA_URLS } from "./constants";
import { verifyReceivedMessage } from "./utils";

const logger = new Logger("activity");

const ACTIVITY_ID = "claim-gamer31-lichess-reputation-credential"; // Never change the id

const handleNewMessage: ActivityOnMessage = async (
  message,
  _webUserRef,
  userActivity,
  saveActivity
) => {
  if (userActivity?.status === "completed") {
    return;
  }

  try {
    logger.info("Checking message", { activityId: ACTIVITY_ID });

    const verified = verifyReceivedMessage(message);
    if (!verified) {
      return;
    }

    logger.info(
      "Received message matched and verified, updating activity now",
      { activityId: ACTIVITY_ID }
    );

    await saveActivity({
      id: ACTIVITY_ID,
      status: "completed",
      data: {},
    });

    toast.success(
      "Congrats, you have completed the activity 'Claim a Gamer31 Lichess credential'"
    );
  } catch (error: unknown) {
    Sentry.captureException(error, {
      tags: {
        activityId: ACTIVITY_ID,
      },
    });
  }
};

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

  logger.info("Initialising activity", { activityId: ACTIVITY_ID });

  const existingRequestId = userActivity?.data?.requestId;
  if (!existingRequestId) {
    logger.info("No existing request id, skipping", {
      activityId: ACTIVITY_ID,
    });
    return () => Promise.resolve();
  }

  try {
    logger.info("Getting Verida Context and Messaging", {
      activityId: ACTIVITY_ID,
    });

    const messaging = await getMessaging(veridaWebUser.current);

    const messages = (await messaging.getMessages()) as
      | ReceivedMessage<unknown>[]
      | undefined;

    const filteredMessages =
      messages?.filter(
        (message) => message.data.replyId === existingRequestId
      ) || [];

    if (filteredMessages.length === 0) {
      logger.info("No messages found for existing request id", {
        activityId: ACTIVITY_ID,
      });
      return () => Promise.resolve();
    }

    logger.info("Checking existing messages", {
      activityId: ACTIVITY_ID,
    });

    filteredMessages.some(async (message) => {
      try {
        logger.info("Checking message", { activityId: ACTIVITY_ID });

        const verified = verifyReceivedMessage(message);
        if (!verified) {
          return false;
        }

        logger.info(
          "Received message matched and verified, updating activity now",
          { activityId: ACTIVITY_ID }
        );

        await saveActivity({
          id: ACTIVITY_ID,
          status: "completed",
          data: {},
        });

        toast.success(
          "Congrats, you have completed the activity 'Claim a Gamer31 Lichess credential'"
        );

        return true;
      } catch (error: unknown) {
        Sentry.captureException(error, {
          tags: {
            activityId: ACTIVITY_ID,
          },
        });
        return false;
      }
    });
  } catch (error: unknown) {
    Sentry.captureException(error, {
      tags: {
        activityId: ACTIVITY_ID,
      },
    });
  }

  return () => Promise.resolve();
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  logger.debug("Executing activity", { activityId: ACTIVITY_ID });

  try {
    // TODO: Make a localised message of this message
    const message = "Please share a Gamer31 Lichess credential";

    logger.info("Sending data request", { activityId: ACTIVITY_ID });

    const sentMessage = await sendDataRequest(veridaWebUser.current, {
      messageSubject: message,
      requestSchema: VAULT_CREDENTIAL_SCHEMA_URL,
      // TODO: Consider using the issuer DID and the type/credentialSubject.type instead of the schema
      filter: {
        $or: GAMER31_LICHESS_VC_SCHEMA_URLS.map((url) => ({
          credentialSchema: url,
        })),
      },
    });

    logger.info("Data request sent", {
      activityId: ACTIVITY_ID,
      hasRequestId: !!sentMessage?.id,
    });

    return {
      status: "pending",
      data: {
        requestId: sentMessage?.id,
      },
      message: defineMessage({
        id: "activities.claimGamer31Lichess.executePendingMessage",
        defaultMessage:
          "A request has been sent to your Wallet inbox. Please check your inbox and share a Gamer31 Lichess credential.",
        description:
          "Message explaining a request has been sent to the their Wallet inbox",
      }),
    };
  } catch (error: unknown) {
    Sentry.captureException(error, {
      tags: {
        activityId: ACTIVITY_ID,
      },
    });
    return {
      status: "todo",
      message: defineMessage({
        id: "activities.claimGamer31Lichess.gettingExecutionErrorMessage",
        defaultMessage: `There was an error while sending you the credential request, please try again later`,
        description: "Error message when we can't get the user profile",
      }),
    };
  }
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_03_ID,
  enabled: true,
  ended: false,
  visible: true,
  order: 6,
  points: 50,
  partners: [PARTNER_ID_GAMER31, PARTNER_ID_PRIVADOID],
  title: defineMessage({
    id: "activities.claimGamer31Lichess.title",
    defaultMessage: "Claim a Gamer31 Lichess credential",
    description: "Title of the activity 'Claim Gamer31 Lichess credential'",
  }),
  description: defineMessage({
    id: "activities.claimGamer31Lichess.description",
    defaultMessage: `Secure your Lichess legacy with the Gamer31 Lichess proof of reputation credential! The credential will be stored in your Verida Wallet, and can be securely shared and verified.`,
    description:
      "Description of the activity 'claim Gamer31 Lichess credential'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimGamer31Lichess.actionLabel",
    defaultMessage: "Send Request",
    description:
      "Label of the button to start the activity claim Gamer31 Lichess credential",
  }),
  actionReExecuteLabel: defineMessage({
    id: "activities.claimGamer31Lichess.actionReExecuteLabel",
    defaultMessage: "Re-send Request",
    description: "Label of the button to perform the activity again ",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimGamer31Lichess.actionExecutingLabel",
    defaultMessage: "Sending Request",
    description:
      "Label of the button when the activity 'claim Gamer31 Lichess credential' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onMessage: handleNewMessage,
  steps: [
    {
      order: 1,
      description: defineMessage({
        id: "activities.claimGamer31Lichess.step1.description",
        defaultMessage:
          "Go to the Gamer 31 claim page (link in the resources below) and click on the Lichess 'Claim' button to start the process.",
        description:
          "Step 1 of the activity 'claim Gamer31 Lichess credential'",
      }),
    },
    {
      order: 2,
      description: defineMessage({
        id: "activities.claimGamer31Lichess.step2.description",
        defaultMessage:
          "Follow the instructions to connect with your Lichess account, then to claim the credential by scanning the two QR codes with your Verida Wallet.",
        description:
          "Step 2 of the activity 'claim Gamer31 Lichess credential'",
      }),
    },
    {
      order: 3,
      description: defineMessage({
        id: "activities.claimGamer31Lichess.step3.description",
        defaultMessage:
          "Click the 'Send Request' button on Verida Missions and share the credential by replying to the message you received in your Wallet inbox.",
        description:
          "Step 3 of the activity 'claim Gamer31 Lichess credential'",
      }),
    },
  ],
  resources: [
    {
      label: defineMessage({
        id: "activities.claimGamer31Lichess.resources.gamer31ClaimPageUrl.label",
        defaultMessage: "Gamer31 claim page",
        description: "Label of the resource 'Gamer31 claim page'",
      }),
      url: "https://gamer31.com/",
    },
  ],
};
