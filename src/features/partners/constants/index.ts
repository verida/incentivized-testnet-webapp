import { partner as partnerGamer31 } from "./gamer31";
import { partner as partnerPolygonId } from "./polygonid";
import { partner as partnerReclaim } from "./reclaim";
import { partner as partnerSynaps } from "./synaps";
import { partner as partnerzkPass } from "./zkpass";

export { PARTNER_ID_GAMER31 } from "./gamer31";
export { PARTNER_ID_POLYGONID } from "./polygonid";
export { PARTNER_ID_RECLAIM } from "./reclaim";
export { PARTNER_ID_SYNAPS } from "./synaps";
export { PARTNER_ID_ZKPASS } from "./zkpass";

export const partners = [
  partnerGamer31,
  partnerPolygonId,
  partnerReclaim,
  partnerSynaps,
  partnerzkPass,
]
  .filter((partner) => partner.visible)
  .sort((a, b) => a.name.localeCompare(b.name));
