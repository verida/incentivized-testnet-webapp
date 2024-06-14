import { partner as partnerPolygonId } from "./polygonid";
import { partner as partnerzkPass } from "./zkpass";

export { PARTNER_ID_POLYGONID } from "./polygonid";
export { PARTNER_ID_ZKPASS } from "./zkpass";

export const partners = [partnerPolygonId, partnerzkPass]
  .filter((partner) => partner.visible)
  .sort((a, b) => a.name.localeCompare(b.name));
