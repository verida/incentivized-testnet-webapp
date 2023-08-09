import { defineMessage } from "react-intl";

import { MISSION_03_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { wait } from "~/utils";

const ACTIVITY_ID = "refer-friend"; // Never change the id

const handleInit: ActivityOnInit = () => {
  return Promise.resolve(() => Promise.resolve());
};

const handleExecute: ActivityOnExecute = async (_veridaWebUser) => {
  // Wait a bit for UX purposes
  await wait(2000);
  return { status: "pending" };
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_03_ID,
  enabled: false,
  visible: false,
  order: 2,
  points: 50,
  title: defineMessage({
    id: "activities.referFriend.title",
    defaultMessage: "Refer a friend",
    description: "Title of the activity 'refer friend'",
  }),
  shortDescription: defineMessage({
    id: "activities.referFriend.shortDescription",
    defaultMessage: "Invite a friend to join the Verida Incentivized Testnet.",
    description: "Short description of the activity 'refer friend'",
  }),
  longDescription: defineMessage({
    id: "activities.referFriend.longDescription",
    defaultMessage: "Invite a friend to join the Verida Incentivized Testnet",
    description: "Long description of the activity 'refer friend'",
  }),
  actionLabel: defineMessage({
    id: "activities.referFriend.actionLabel",
    defaultMessage: "Get Referal Link",
    description: "Label of the button to start the activity refer friend",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.referFriend.actionExecutingLabel",
    defaultMessage: "Preparing",
    description:
      "Label of the button when the activity 'refer friend' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
};
