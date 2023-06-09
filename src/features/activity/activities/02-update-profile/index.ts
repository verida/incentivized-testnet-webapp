import { defineMessage } from "react-intl";

import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
  ActivityOnUnmount,
} from "~/features/activity/types";
import { wait } from "~/utils";

const ACTIVITY_ID = "update-profile"; // Never change the id

const handleInit: ActivityOnInit = async (veridaWebUser, saveActivity) => {
  // TODO: Uncomment this code when we have more activities
  // const checkAndUpdate = async () => {
  //   const { status } = await handleExecute(veridaWebUser);
  //   saveActivity({ id: ACTIVITY_ID, status });
  //   return status;
  // };

  // // Check if the profile is already filled
  // const status = await checkAndUpdate();

  // if (status !== "completed") {
  //   // Set a listener to the WebUser to update the activity status when the profile is updated
  //   veridaWebUser.current.addListener("profileChanged", () => {
  //     void checkAndUpdate();
  //     // Monitor the possible exception where saveActivity is not defined because the async is not executed
  //   });
  // }
  return Promise.resolve();
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  const profile = await veridaWebUser.current.getPublicProfile(true);

  // Checking if the profile fields are filled
  const missingFields = [];
  if (!profile.name) {
    missingFields.push("name");
  }
  if (!profile.description) {
    missingFields.push("description");
  }
  if (!profile.avatarUri) {
    missingFields.push("avatar");
  }

  // If all fields are filled the activity is completed
  if (missingFields.length === 0) {
    return { status: "completed" };
  }
  // If not, the activity is back to its initial state

  // Wait a bit for UX purposes or the user will think nothing happened
  await wait(3000);

  const missingFieldErrorMessage = defineMessage({
    id: "activity.updateProfile.missingFieldsErrorMessage",
    defaultMessage: `Some information are missing, please fill your public name, description and set an avatar in your profile`,
    description:
      "Error message when the user didn't fill all the fields of their profile",
  });

  return {
    status: "todo",
    message: missingFieldErrorMessage,
  };
};

const handleUnmount: ActivityOnUnmount = async (_veridaWebUser) => {
  // Nothing to do. As the init() set a listener to the WebUser, it will be automatically removed by the Verida Context itself.
  return Promise.resolve();
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  enabled: true,
  visible: true,
  order: 2,
  title: "Update your profile",
  shortDescription: "Update your public name, avatar and description",
  actionLabel: defineMessage({
    id: "activities.updateProfile.actionLabel",
    defaultMessage: "Verify",
    description: "Label of the button to start the activity update profile",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.updateProfile.actionExecutingLabel",
    defaultMessage: "Verifying...",
    description:
      "Label of the button when the activity 'update your profile' is being executed",
  }),
  resources: [
    {
      label: "How to update your Verida Identity profile",
      url: "https://verida.io",
    },
  ],
  onInit: handleInit,
  onExecute: handleExecute,
  onUnmount: handleUnmount,
};
