import { partner as partner01 } from "./partner-01";
import { partner as partner02 } from "./partner-02";

export { PARTNER_01_ID } from "./partner-01";
export { PARTNER_02_ID } from "./partner-02";

export const partners = [partner01, partner02].sort(
  (a, b) => a.order - b.order
);
