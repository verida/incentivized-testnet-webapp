import { defineMessage } from "react-intl";

import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnUnmount,
} from "~/features/activity/types";
import { wait } from "~/utils";

const ACTIVITY_ID = "refer-friend"; // Never change the id

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
  enabled: false,
  visible: true,
  order: 3,
  title: "Refer a friend",
  shortDescription: "Invite a friend to join the Verida Incentivized Testnet",
  actionLabel: defineMessage({
    id: "activities.referFriend.actionLabel",
    defaultMessage: "Get Referal Link",
    description: "Label of the button to start the activity refer friend",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.referFriend.actionExecutingLabel",
    defaultMessage: "Preparing...",
    description:
      "Label of the button when the activity 'refer friend' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  onUnmount: handleUnmount,
};
