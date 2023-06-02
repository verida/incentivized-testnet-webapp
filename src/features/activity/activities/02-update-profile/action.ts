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
    return "completed";
  }
  // If not, the activity is back to its initial state

  // Wait a bit for UX purposes or the user will think nothing happened
  await wait(3000);
  return "todo";
};
