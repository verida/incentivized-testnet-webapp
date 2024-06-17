import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnMessage,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { MISSION_04_ID } from "~/features/missions";
import { PARTNER_ID_POLYGONID, PARTNER_ID_SYNAPS } from "~/features/partners";
import { Sentry } from "~/features/sentry";
import {
  type ReceivedMessage,
  VAULT_CREDENTIAL_SCHEMA_URL,
  getMessaging,
  sendDataRequest,
} from "~/features/verida";

import { ANIMA_PROOF_OF_LIFE_VC_SCHEMA_URLS } from "./constants";
import { verifyReceivedMessage } from "./utils";

const logger = new Logger("activity");

const ACTIVITY_ID = "claim-anima-pol-credential"; // Never change the id

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
      "Congrats, you have completed the activity 'Claim a Synaps Proof of Life credential'"
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
          "Congrats, you have completed the activity 'Claim a Synaps Proof of Life credential'"
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
    const message = "Please share a Synaps Proof of Life credential";

    logger.info("Sending data request", { activityId: ACTIVITY_ID });

    const sentMessage = await sendDataRequest(veridaWebUser.current, {
      messageSubject: message,
      requestSchema: VAULT_CREDENTIAL_SCHEMA_URL,
      // TODO: Consider using the issuer DID and the type/credentialSubject.type instead of the schema
      filter: {
        $or: ANIMA_PROOF_OF_LIFE_VC_SCHEMA_URLS.map((url) => ({
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
        id: "activities.claimAnimaPoLCredential.executePendingMessage",
        defaultMessage:
          "A request has been sent to your Wallet inbox. Please check your inbox and share the credential.",
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
        id: "activities.claimAnimaPoLCredential.gettingExecutionErrorMessage",
        defaultMessage: `There was an error while sending you the credential request, please try again later`,
        description: "Error message when we can't get the user profile",
      }),
    };
  }
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_04_ID,
  partners: [PARTNER_ID_POLYGONID, PARTNER_ID_SYNAPS],
  enabled: true,
  ended: false,
  visible: true,
  order: 1,
  points: 100,
  title: defineMessage({
    id: "activities.claimAnimaPoLCredential.title",
    defaultMessage:
      "Synaps - Claim a Proof of Life (PoL) Polygon ID credential",
    description:
      "Title of the activity 'Claim Synaps/Anima Proof of Life credential'",
  }),
  shortDescription: defineMessage({
    id: "activities.claimAnimaPoLCredential.shortDescription",
    defaultMessage: `Claim your Proof of Life with Polygon ID and join the Sybil resistance. The credential will be stored in your Verida Wallet, and can be securely shared and verified.`,
    description:
      "Short description of the activity 'Claim Synaps/Anima Proof of Life credential'",
  }),
  longDescription: defineMessage({
    id: "activities.claimAnimaPoLCredential.longDescription",
    defaultMessage: `Claim your Proof of Life with Polygon ID and join the Sybil resistance. The credential will be stored in your Verida Wallet, and can be securely shared and verified.{newline}{newline}Step 1. Go to the Synaps Proof of Life claim page to start the process (link in resources below).{newline}{newline}Step 2. Connect with your MetaMask wallet and follow the prompts to complete your proof of life check.{newline}{newline}Step 3. Claim your Proof of Life credential on Polygon ID. Use your Verida Wallet to connect and save the credential in your wallet.{newline}{newline}Step 4. Go back to Verida Missions. Click on the 'Send Request' button below and share the credential by replying to the message you received in your Wallet inbox.`,
    description:
      "Long description of the activity 'Claim Synaps/Anima Proof of Life credential'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimAnimaPoLCredential.actionLabel",
    defaultMessage: "Send Request",
    description:
      "Label of the button to start the activity Claim Synaps/Anima Proof of Life credential",
  }),
  actionReExecuteLabel: defineMessage({
    id: "activities.claimAnimaPoLCredential.actionReExecuteLabel",
    defaultMessage: "Re-send Request",
    description: "Label of the button to perform the activity again ",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimAnimaPoLCredential.actionExecutingLabel",
    defaultMessage: "Sending Request",
    description:
      "Label of the button when the activity 'Claim Synaps/Anima Proof of Life credential' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onMessage: handleNewMessage,
  resources: [
    {
      label: defineMessage({
        id: "activities.claimAnimaPoLCredential.resources.claimPageUrl.label",
        defaultMessage: "Synaps Proof of Life claim page",
        description: "Label of the resource 'Synaps Proof of Life claim page'",
      }),
      url: "https://pol.claim.anima.io/",
    },
    {
      label: defineMessage({
        id: "activities.claimAnimaPoLCredential.resources.userGuide.label",
        defaultMessage:
          "User Guide: How to claim your Synaps Proof of Life credential",
        description: "Label of the resource 'user guide'",
      }),
      url: "https://community.verida.io/user-guides/how-to-claim-a-proof-of-life-pol-polygon-id-credential",
    },
    {
      label: defineMessage({
        id: "activities.claimAnimaPoLCredential.resources.videoUserGuide.label",
        defaultMessage:
          "Video: Synaps - Claim a Proof of Life (PoL) Polygon ID Credential / Verida Network",
        description: "Label of the resource 'video user guide'",
      }),
      url: "https://youtu.be/YQCqeziLdZg",
    },
    {
      label: defineMessage({
        id: "activities.claimAnimaPoLCredential.resources.blog.label",
        defaultMessage: "Blog: Verida and Synaps Partnership Announcement",
        description: "Label of the resource 'blog announcement'",
      }),
      url: "https://news.verida.io/verida-and-synaps-partner-to-bring-private-identity-verification-to-web3-8ebd5a2f78b3",
    },
  ],
};
