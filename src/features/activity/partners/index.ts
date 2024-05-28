import { partner as partnerPolygonId } from "./partner-polygon_id";
import { partner as partnerzkPass } from "./partner-zkpass";

export { PARTNER_ID_POLYGONID } from "./partner-polygon_id";
export { PARTNER_ID_ZKPASS } from "./partner-zkpass";

export const partners = [partnerPolygonId, partnerzkPass].sort(
  (a, b) => a.order - b.order
);
