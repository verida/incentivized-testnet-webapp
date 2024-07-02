import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnMessage,
} from "~/features/activity/types";
import { copyToClipboard } from "~/features/clipboard";
import { Logger } from "~/features/logger";
import { MISSION_01_ID } from "~/features/missions";
import { Sentry } from "~/features/sentry";
import { ReceivedMessage, getMessaging } from "~/features/verida";
import { wait } from "~/utils";

import { ACTIVITY_ID } from "./constants";
import {
  buildReferralUrl,
  checkAndHandleReferralInUrl,
  verifyReceivedMessage,
} from "./utils";

const logger = new Logger("activity");

const handleNewMessage: ActivityOnMessage = async (
  message,
  webUserRef,
  userActivity,
  saveActivity
) => {
  if (userActivity?.status === "completed") {
    return;
  }

  try {
    logger.info("Checking new message", { activityId: ACTIVITY_ID });
    logger.debug("Checking message for referral", message);

    const did = webUserRef.current.getDid();

    const verified = verifyReceivedMessage(message, did);
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
      data: {
        referredDids: [message.sentBy.did],
      },
    });

    toast.success(
      "Congrats, you have completed the activity 'Refer a fried to join Verida Missions'"
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
  logger.info("Initialising activity", { activityId: ACTIVITY_ID });

  // Handle referral in URL
  await checkAndHandleReferralInUrl(veridaWebUser.current);

  if (userActivity?.status === "completed") {
    logger.debug("Activity already completed, no initialisation needed", {
      activityId: ACTIVITY_ID,
    });
    return () => Promise.resolve();
  }

  const did = veridaWebUser.current.getDid();

  try {
    logger.info("Getting Verida Context and Messaging", {
      activityId: ACTIVITY_ID,
    });

    const messaging = await getMessaging(veridaWebUser.current);

    // Check existing messages for referral confirmation while the user was not connected.

    const messages = (await messaging.getMessages()) as
      | ReceivedMessage<unknown>[]
      | undefined;

    if (messages?.length) {
      logger.info("Checking existing messages", { activityId: ACTIVITY_ID });

      logger.debug("start iterating over messages");
      // Iterating over the messages and stopping on the first matching the condition to avoid saving the activity multiple times in case there are several valid messages
      messages.some(async (message) => {
        try {
          logger.info("Checking message", { activityId: ACTIVITY_ID });
          logger.debug("Checking message for referral", message);

          const verified = verifyReceivedMessage(message, did);
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
            data: {
              referredDids: [message.sentBy.did],
            },
          });

          toast.success(
            "Congrats, you have completed the activity 'Refer a fried to join Verida Missions'"
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
    } else {
      logger.info("No existing messages to check", { activityId: ACTIVITY_ID });
    }
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

  // Wait a bit for UX purposes
  await wait(500);

  const did = veridaWebUser.current.getDid();

  const url = buildReferralUrl(did);
  const isCopiedToClipboard = await copyToClipboard(url);

  const linkCopiedMessage = defineMessage({
    id: "activities.referFriend.executionResult.message",
    description:
      "Toast message displayed after executing the 'Refer a friend activity'",
    defaultMessage:
      "Your referral link has been copied to your clipboard. Share it with friends",
  });

  return {
    status: "pending",
    message: isCopiedToClipboard ? linkCopiedMessage : undefined,
    data: {
      referralLink: url,
    },
  };
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_01_ID,
  enabled: true,
  ended: true,
  visible: true,
  order: 4,
  points: 100,
  partners: [],
  title: defineMessage({
    id: "activities.referFriend.title",
    defaultMessage: "Refer a friend to join Verida Missions",
    description: "Title of the activity 'refer friend'",
  }),
  shortDescription: defineMessage({
    id: "activities.referFriend.shortDescription",
    defaultMessage:
      "This activity is temporarily closed.{newline}{newline}Invite a friend to create a Decentralized Identity and take control of their personal data.",
    description: "Short description of the activity 'refer friend'",
  }),
  longDescription: defineMessage({
    id: "activities.referFriend.longDescription",
    defaultMessage:
      "This activity is temporarily closed.{newline}{newline}Invite a friend to create a Decentralized Identity and take control of their personal data.{newline}{newline}Step 1. Get your Verida Missions referral link below{newline}{newline}Step 2. Share your referral link with a friend{newline}{newline}Step 3. Your friend will have to create a Verida Identity and connect to Verida Missions with your referral link for your activity to be completed",
    description: "Long description of the activity 'refer friend'",
  }),
  actionLabel: defineMessage({
    id: "activities.referFriend.actionLabel",
    defaultMessage: "Get Referral Link",
    description: "Label of the button to start the activity refer friend",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.referFriend.actionExecutingLabel",
    defaultMessage: "Getting link",
    description:
      "Label of the button when the activity 'refer friend' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onMessage: handleNewMessage,
  steps: [
    {
      id: "activities.referFriend.step1",
      defaultMessage: "Get your Verida Missions referral link below.",
      description: "Step 1 of the activity 'refer friend'",
    },
    {
      id: "activities.referFriend.step2",
      defaultMessage: "Share your referral link with a friend.",
      description: "Step 2 of the activity 'refer friend'",
    },
    {
      id: "activities.referFriend.step3",
      defaultMessage:
        "Your friend will have to create a Verida Identity and connect to Verida Missions with your referral link for your activity to be completed.",
      description: "Step 3 of the activity 'refer friend'",
    },
  ],
};
