import { activity as activityClaimAnimaPoL } from "./claim-anima-pol-credential";
import { activity as activityClaimGateKeeperAdopter } from "./claim-gatekeeper-adopter-credential";
import { activity as activityCreateVeridaIdentity } from "./create-verida-identity";
import { gamer31Activities } from "./gamer31";
import { activities as reclaimActivities } from "./reclaim";
import { activity as activityReferFriend } from "./refer-friend";
import { activity as activityUpdateProfile } from "./update-profile";
import { activity as activityUseMarkdownEditor } from "./use-markdown-editor";
import { activities as zkPassActivities } from "./zkpass";

export const activities = [
  activityCreateVeridaIdentity,
  activityUpdateProfile,
  activityReferFriend,
  activityUseMarkdownEditor,
  activityClaimGateKeeperAdopter,
  activityClaimAnimaPoL,
  ...gamer31Activities,
  ...zkPassActivities,
  ...reclaimActivities,
].sort((a, b) => a.order - b.order);
