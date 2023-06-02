import { ActivityAction } from "~/features/activity/types";
import { wait } from "~/utils";

export const action: ActivityAction = async (_veridaWebUser) => {
  await wait(5000);
  return "pending";
};
