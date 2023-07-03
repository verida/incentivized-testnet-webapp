import { activity as activity01 } from "./01-create-verida-identity";
import { activity as activity02 } from "./02-update-profile";
import { activity as activity03 } from "./03-refer-friend";
import { activity as activity05 } from "./05-claim-polygon-id";
import { activity as activity06 } from "./06-claim-social-media-data";
import { activity as activity04 } from "./use-markdown-editor";

export const activities = [
  activity01,
  activity02,
  activity03,
  activity04,
  activity05,
  activity06,
].sort((a, b) => a.order - b.order);
