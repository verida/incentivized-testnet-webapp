import { IMessaging } from "@verida/types";
import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import { VERIDA_CONTEXT_NAME } from "~/constants";
import { MISSION_01_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import {
  ReceivedMessage,
  getMessaging,
  isValidVeridaDid,
  sendMessage,
} from "~/features/verida";
import { wait } from "~/utils";

import { REFERRAL_CONFIRMATION_MESSAGE, REFERRAL_PARAM } from "./constants";
import { buildReferralUrl, verifyReceivedMessage } from "./utils";

const logger = new Logger("activity");

const ACTIVITY_ID = "refer-friend"; // Never change the id

const handleInit: ActivityOnInit = async (
  veridaWebUser,
  userActivity,
  saveActivity
) => {
  logger.info("Init activity", { activityId: ACTIVITY_ID });

  const did = await veridaWebUser.current.getDid();

  const checkMessage = async (message: ReceivedMessage<unknown>) => {
    try {
      logger.info("Checking received message", { activityId: ACTIVITY_ID });
      logger.debug("Checking message for referral", message);

      const verified = verifyReceivedMessage(message, did);
      if (!verified) {
        return;
      }

      logger.debug(
        "Received message matched and verified, updating activity now"
      );

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

  logger.info("Checking referral in URL", { activityId: ACTIVITY_ID });

  const searchParams = new URLSearchParams(document.location.search);
  const referrer = searchParams.get(REFERRAL_PARAM);

  if (referrer && isValidVeridaDid(referrer)) {
    logger.info("Referral found in URL, sending confirmation", {
      activityId: ACTIVITY_ID,
      referrer,
    });

    await sendMessage(veridaWebUser.current, {
      message: REFERRAL_CONFIRMATION_MESSAGE,
      subject: REFERRAL_CONFIRMATION_MESSAGE,
      targetDid: referrer,
      targetContext: VERIDA_CONTEXT_NAME, // This app context name
    });

    logger.info("Referral confirmation successfully sent", {
      activityId: ACTIVITY_ID,
      referrer,
    });
  }

  let messaging: IMessaging | undefined;

  const cleanUpFunction = async () => {
    try {
      logger.info("Cleaning up onMessage handler", { activityId: ACTIVITY_ID });

      if (messaging) await messaging.offMessage(checkMessage);
    } catch (error: unknown) {
      Sentry.captureException(error, {
        tags: {
          activityId: ACTIVITY_ID,
        },
      });
    }
  };

  if (userActivity?.status === "completed") {
    logger.debug("Activity already completed, not checking messages");
    return cleanUpFunction;
  }

  logger.info("Checking existing messages and setting message listener", {
    activityId: ACTIVITY_ID,
  });

  try {
    logger.info("Getting Verida Context and Messaging", {
      activityId: ACTIVITY_ID,
    });

    messaging = await getMessaging(veridaWebUser.current);

    const messages = (await messaging.getMessages()) as
      | ReceivedMessage<unknown>[]
      | undefined;

    if (messages) {
      logger.info("Checking existing messages", { activityId: ACTIVITY_ID });

      void Promise.allSettled(messages.map(checkMessage));
    }

    logger.info("Setting up onMessage handler", { activityId: ACTIVITY_ID });

    void messaging.onMessage(checkMessage);
  } catch (error: unknown) {
    Sentry.captureException(error, {
      tags: {
        activityId: ACTIVITY_ID,
      },
    });
  }

  return cleanUpFunction;
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  // Wait a bit for UX purposes
  await wait(500);

  const did = await veridaWebUser.current.getDid();

  const url = buildReferralUrl(did);

  // TODO: Implement displaying the URL to the user, show in console for now
  console.debug(url);

  return { status: "pending" };
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_01_ID,
  enabled: true,
  visible: true,
  order: 2,
  points: 50,
  title: defineMessage({
    id: "activities.referFriend.title",
    defaultMessage: "Refer a friend to join Verida Missions",
    description: "Title of the activity 'refer friend'",
  }),
  shortDescription: defineMessage({
    id: "activities.referFriend.shortDescription",
    defaultMessage: "Invite a friend to join Verida Missions.",
    description: "Short description of the activity 'refer friend'",
  }),
  longDescription: defineMessage({
    id: "activities.referFriend.longDescription",
    defaultMessage: "Invite a friend to join Verida Missions",
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
};
