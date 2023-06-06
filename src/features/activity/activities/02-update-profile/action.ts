import { defineMessage } from "react-intl";

import { ActivityAction } from "~/features/activity/types";
import { wait } from "~/utils";

export const action: ActivityAction = async (veridaWebUser) => {
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
