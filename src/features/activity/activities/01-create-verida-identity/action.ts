import { ActivityAction } from "~/features/activity/types";
import { wait } from "~/utils";

export const action: ActivityAction = async (veridaWebUser) => {
  const isConnected = await veridaWebUser.current.isConnected();
  if (isConnected) {
    return { status: "completed" };
  }
  // Wait a bit for UX purposes or the user will think nothing happened
  await wait(3000);
  return { status: "todo" };
};
