import { activity as activity05 } from "./claim-polygon-id";
import { activity as activity06 } from "./claim-social-media-data";
import { activity as activity01 } from "./create-verida-identity";
import { activity as activity03 } from "./refer-friend";
import { activity as activity02 } from "./update-profile";
import { activity as activity04 } from "./use-markdown-editor";

export const activities = [
  activity01,
  activity02,
  activity03,
  activity04,
  activity05,
  activity06,
].sort((a, b) => a.order - b.order);
