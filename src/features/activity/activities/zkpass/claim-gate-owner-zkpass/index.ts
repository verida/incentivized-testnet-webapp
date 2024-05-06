import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import { config } from "~/config";
import { VERIDA_CREDENTIAL_ZKPASS_SCHEMA_URLS } from "~/features/activity/activities/zkpass/constants";
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

import { ZKPASS_GATE_OWNER_SCHEMA_ID } from "./constants";
import { verifyReceivedMessage } from "./utils";

const logger = new Logger("activity");

const ACTIVITY_ID = "claim-gate-owner-zkpass"; // Never change the id

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
      "Congrats, you have completed the activity 'Claim a Gate credential/Prove ownership'"
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
          "Congrats, you have completed the activity 'Claim a Gate credential/Prove ownership'"
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
      `${config.proof.connectorBaseUrl}?veridaDid=${did}&schemaId=${ZKPASS_GATE_OWNER_SCHEMA_ID}`
    );

    // TODO: Make a localised message of this message
    const message =
      "Please share a Gate account credential from ZkPass protocol";

    logger.info("Sending data request", { activityId: ACTIVITY_ID });

    const sentMessage = await sendDataRequest(veridaWebUser.current, {
      messageSubject: message,
      requestSchema: VAULT_CREDENTIAL_SCHEMA_URL,
      filter: {
        "$or": VERIDA_CREDENTIAL_ZKPASS_SCHEMA_URLS.map((url) => ({
          credentialSchema: url,
        })),
        "credentialData.credentialSubject.zkPassSchemaId":
          ZKPASS_GATE_OWNER_SCHEMA_ID,
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
        id: "activities.claimGateOwner.executePendingMessage",
        defaultMessage:
          "A request has been sent to your wallet inbox. Please check your Verida Wallet Inbox and share the credentials.",
        description:
          "Message explaining a request has been sent to your verida wallet inbox",
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
        id: "activities.claimGateOwner.gettingExecutionErrorMessage",
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
  order: 1,
  points: 50,
  title: defineMessage({
    id: "activities.claimGateOwner.title",
    defaultMessage: "Claim a Gate credential/Prove ownership",
    description:
      "Title of the activity 'Claim a Gate credential/Prove ownership'",
  }),
  shortDescription: defineMessage({
    id: "activities.claimGateOwner.shortDescription",
    defaultMessage: `Claim a Gate credential/Prove ownership using ZkPass protocol. The credentails should be stored in your verida wallet.`,
    description:
      "Short description of the activity 'Claim a Gate credential/Prove ownership'",
  }),
  longDescription: defineMessage({
    id: "activities.claimGateOwner.longDescription",
    defaultMessage: `Claim a Gate credential/Prove ownership. The credentails will be stored in your Verida Wallet, and can be securely shared and verified.{newline}{newline}Step1. Go to proof-dapp-connector app and complete verification process for Gate account.{newline}{newline}Step2. Open your Verida Wallet inbox and accept message from dapp-connector. {newline}{newline}Step3. Accept request from verida mission to share credentials.{newline}{newline}Step4. Select and share credentials.
      `,
    description:
      "Long description of the activity 'Claim a Gate credential/Prove ownership'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimGateOwner.actionLabel",
    defaultMessage: "Verify",
    description:
      "Label of the button to start the activity Claim Gate ownership",
  }),
  actionReExecuteLabel: defineMessage({
    id: "activities.claimGateOwner.actionReExecuteLabel",
    defaultMessage: "Re-send Request",
    description: "Label of the button to perform the activity again ",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimGateOwner.actionExecutingLabel",
    defaultMessage: "Sending Request",
    description:
      "Label of the button when the activity 'Claim Gate ownership' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onMessage: handleNewMessage,
  resources: [
    {
      label: defineMessage({
        id: "activities.claimGateOwner.resources.ZkPassPageUrl.label",
        defaultMessage: "User guide of ZkPass protocol",
        description: "Label of the resource 'User guide of ZkPass protocol'",
      }),
      url: "https://zkpass.gitbook.io/zkpass/user-guides/overview",
    },
  ],
};
