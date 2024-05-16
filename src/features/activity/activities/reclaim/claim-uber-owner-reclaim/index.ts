import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import { config } from "~/config";
import { VERIDA_CREDENTIAL_RECLAIM_SCHEMA_URLS } from "~/features/activity/activities/reclaim/constants";
import { MISSION_06_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnMessage,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import {
  type ReceivedMessage,
  VAULT_CREDENTIAL_SCHEMA_URL,
  getMessaging,
  sendDataRequest,
} from "~/features/verida";

import { RECLAIM_PROTOCOL_UBER_OWNER_PROVIDER_ID } from "./constants";
import { verifyReceivedMessage } from "./utils";

const logger = new Logger("activity");

const ACTIVITY_ID = "claim-uber-owner-reclaim"; // Never change the id

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
      "Congrats, you have completed the activity 'Claim an Uber credential/Prove ownership'"
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
          "Congrats, you have completed the activity 'Claim an Uber credential/Prove ownership'"
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
    const did = veridaWebUser.current.getDid();
    window.open(
      `${config.proof.connectorBaseUrl}?veridaDid=${did}&schemaId=${RECLAIM_PROTOCOL_UBER_OWNER_PROVIDER_ID}`
    );

    // TODO: Make a localised message of this message
    const message =
      "Please share a Uber account credential from Reclaim protocol";

    logger.info("Sending data request", { activityId: ACTIVITY_ID });

    const sentMessage = await sendDataRequest(veridaWebUser.current, {
      messageSubject: message,
      requestSchema: VAULT_CREDENTIAL_SCHEMA_URL,
      filter: {
        "$or": VERIDA_CREDENTIAL_RECLAIM_SCHEMA_URLS.map((url) => ({
          credentialSchema: url,
        })),
        "credentialData.credentialSubject.reclaimProviderId":
          RECLAIM_PROTOCOL_UBER_OWNER_PROVIDER_ID,
      } as Record<string, unknown>,
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
        id: "activities.claimUberOwner.executePendingMessage",
        defaultMessage:
          "A request has been sent to your wallet inbox. Please check your Verida Wallet Inbox and share the credentials.",
        description:
          "Message explaining a request has been sent to your Verida Wallet inbox",
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
        id: "activities.claimUberOwner.gettingExecutionErrorMessage",
        defaultMessage: `There was an error while sending you the credential request, please try again later`,
        description: "Error message when we can't get the user profile",
      }),
    };
  }
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_06_ID,
  enabled: true,
  ended: false,
  visible: true,
  order: 5,
  points: 100,
  title: defineMessage({
    id: "activities.claimUberOwner.title",
    defaultMessage: "Claim an Uber credential/Prove ownership",
    description:
      "Title of the activity 'Claim an Uber credential/Prove ownership'",
  }),
  shortDescription: defineMessage({
    id: "activities.claimUberOwner.shortDescription",
    defaultMessage: `Claim an Uber credential/Prove ownership using Reclaim protocol. The credentials should be stored in your Verida Wallet.`,
    description:
      "Short description of the activity 'Claim an Uber credential/Prove ownership'",
  }),
  longDescription: defineMessage({
    id: "activities.claimUberOwner.longDescription",
    defaultMessage: `Prove ownership and claim a credential of your Binance account. The credentials will be stored in your Verida Wallet, and can be securely shared and verified.{newline}{newline}Step 1. Click on the 'Verify' button and follow the instructions to perform the verification process. Once done, the proof will be sent to your inbox.{newline}{newline}Step 2. Accept the proof credential received in your inbox to save the credential. {newline}{newline}Step 3. Reply to the message sent by Verida missions to share your new credential .{newline}{newline}`,
    description:
      "Long description of the activity 'Claim an Uber credential/Prove ownership'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimUberOwner.actionLabel",
    defaultMessage: "Verify",
    description:
      "Label of the button to start the activity Claim Uber ownership",
  }),
  actionReExecuteLabel: defineMessage({
    id: "activities.claimUberOwner.actionReExecuteLabel",
    defaultMessage: "Verify again",
    description: "Label of the button to perform the activity again ",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimUberOwner.actionExecutingLabel",
    defaultMessage: "Sending Request",
    description:
      "Label of the button when the activity 'Claim Uber ownership' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onMessage: handleNewMessage,
  resources: [
    {
      label: defineMessage({
        id: "activities.claimUberOwner.resources.reclaimPageUrl.label",
        defaultMessage: "Whitepaper of Reclaim protocol",
        description: "Label of the resource 'Whitepaper of Reclaim protocol'",
      }),
      url: "https://www.reclaimprotocol.org/whitepaper/",
    },
  ],
};
