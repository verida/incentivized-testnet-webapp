import { defineMessage } from "react-intl";

import { MISSION_01_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnUnmount,
} from "~/features/activity/types";
import { wait } from "~/utils";

const ACTIVITY_ID = "claim-social-media-data"; // Never change the id

const handleInit: ActivityOnInit = () => {
  return Promise.resolve();
};

const handleExecute: ActivityOnExecute = async (_veridaWebUser) => {
  await wait(5000);
  return { status: "pending" };
};

const handleUnmount: ActivityOnUnmount = async (_veridaWebUser) => {
  return Promise.resolve();
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_01_ID,
  enabled: false,
  visible: true,
  order: 6,
  title: defineMessage({
    id: "activities.claimSocialMediaData.title",
    defaultMessage: "Claim your social media data",
    description: "Title of the activity 'claim social media data'",
  }),
  shortDescription: defineMessage({
    id: "activities.claimSocialMediaData.shortDescription",
    defaultMessage:
      "Connect your Twitter account in the Verida Wallet and extract your data",
    description: "Short description of the activity 'claim social media data'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimSocialMediaData.actionLabel",
    defaultMessage: "Verify",
    description:
      "Label of the button to start the activity claim social media data",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimSocialMediaData.actionExecutingLabel",
    defaultMessage: "Verifying...",
    description:
      "Label of the button when the activity 'claim social media data' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onUnmount: handleUnmount,
};
