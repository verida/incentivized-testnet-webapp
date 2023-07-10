import { activity as activityClaimGateKeeperAdopter } from "./claim-gatekeeper-adopter-credential";
import { activity as activityClaimPolygonId } from "./claim-polygon-id";
import { activity as activityClaimSocialMediaData } from "./claim-social-media-data";
import { activity as activityCreateVeridaIdentity } from "./create-verida-identity";
import { activity as activityReferFriend } from "./refer-friend";
import { activity as activityUpdateProfile } from "./update-profile";
import { activity as activityUseMarkdownEditor } from "./use-markdown-editor";

export const activities = [
  activityCreateVeridaIdentity,
  activityUpdateProfile,
  activityReferFriend,
  activityUseMarkdownEditor,
  activityClaimPolygonId,
  activityClaimGateKeeperAdopter,
  activityClaimSocialMediaData,
].sort((a, b) => a.order - b.order);
