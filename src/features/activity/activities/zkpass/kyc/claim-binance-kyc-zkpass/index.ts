import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import { config } from "~/config";
import {
  VERIDA_CREDENTIAL_ZKPASS_SCHEMA_URLS,
  ZKPASS_INTRODUCTION_URL,
} from "~/features/activity/activities/zkpass/constants";
import { MISSION_05_ID } from "~/features/activity/missions";
import { PARTNER_ID_ZKPASS } from "~/features/activity/partners";
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

import { ACTIVITY_ID, ZKPASS_BINANCE_KYC_SCHEMA_ID } from "./constants";
import { verifyReceivedMessage } from "./utils";

const logger = new Logger("activity");

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
      "Congrats, you have completed the activity 'Prove KYC level and claim a credential of your Binance account'"
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
          "Congrats, you have completed the activity 'Prove KYC level and claim a credential of your Binance account'"
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
      `${config.proof.connectorBaseUrl}?veridaDid=${did}&schemaId=${ZKPASS_BINANCE_KYC_SCHEMA_ID}`
    );

    // TODO: Make a localised message of this message
    const message =
      "Please share a Binance account KYC credential from zkPass protocol";

    logger.info("Sending data request", { activityId: ACTIVITY_ID });

    const sentMessage = await sendDataRequest(veridaWebUser.current, {
      messageSubject: message,
      requestSchema: VAULT_CREDENTIAL_SCHEMA_URL,
      filter: {
        "$or": VERIDA_CREDENTIAL_ZKPASS_SCHEMA_URLS.map((url) => ({
          credentialSchema: url,
        })),
        "credentialData.credentialSubject.zkPassSchemaId":
          ZKPASS_BINANCE_KYC_SCHEMA_ID,
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
        id: "activities.claimBinanceKYCzkPass.executePendingMessage",
        defaultMessage:
          "A request has been sent to your inbox. Please check your Verida Wallet inbox and share the credentials.",
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
        id: "activities.claimBinanceKYCzkPass.gettingExecutionErrorMessage",
        defaultMessage: `There was an error while sending you the credential request, please try again later`,
        description: "Error message when we can't get the user profile",
      }),
    };
  }
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_05_ID,
  partners: [PARTNER_ID_ZKPASS],
  enabled: true,
  ended: false,
  visible: true,
  order: 1,
  points: 50,
  title: defineMessage({
    id: "activities.claimBinanceKYCzkPass.title",
    defaultMessage: "Prove KYC level and claim a Binance credential",
    description:
      "Title of the activity 'Prove KYC level and claim a credential of your Binance account'",
  }),
  shortDescription: defineMessage({
    id: "activities.claimBinanceKYCzkPass.shortDescription",
    defaultMessage: `Prove KYC level and claim a credential of your Binance account. The credentials will be stored in the Verida Network, and can be securely shared and verified.`,
    description:
      "Short description of the activity 'Prove KYC level and claim a credential of your Binance account'",
  }),
  longDescription: defineMessage({
    id: "activities.claimBinanceKYCzkPass.longDescription",
    defaultMessage: `Prove KYC level and claim a credential of your Binance account. The credentials will be securely stored on the Verida Network, and can be shared and verified.{newline}{newline}Step 1. Click on the 'Verify' button and follow the instructions to perform the verification process. Once done, the proof will be sent to your inbox.{newline}{newline}Step 2. Accept the proof credential received in your inbox to save the credential. {newline}{newline}Step 3. Reply to the message sent by Verida Missions to share your new credential.`,
    description:
      "Long description of the activity 'Prove KYC level and claim a credential of your Binance account'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimBinanceKYCzkPass.actionLabel",
    defaultMessage: "Verify",
    description:
      "Label of the button to start the activity Claim Binance KYC level",
  }),
  actionReExecuteLabel: defineMessage({
    id: "activities.claimBinanceKYCzkPass.actionReExecuteLabel",
    defaultMessage: "Verify again",
    description: "Label of the button to perform the activity again ",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimBinanceKYCzkPass.actionExecutingLabel",
    defaultMessage: "Sending Request",
    description:
      "Label of the button when the activity 'Claim Binance KYC level' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onMessage: handleNewMessage,
  resources: [
    {
      label: defineMessage({
        id: "activities.claimBinanceKYCzkPass.resources.zkPassPageUrl.label",
        defaultMessage: "User guide of zkPass protocol",
        description: "Label of the resource 'User guide of zkPass protocol'",
      }),
      url: ZKPASS_INTRODUCTION_URL,
    },
  ],
};
