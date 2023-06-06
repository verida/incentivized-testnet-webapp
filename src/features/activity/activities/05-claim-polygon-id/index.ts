import { defineMessage } from "react-intl";

import type { Activity } from "~/features/activity/types";

import { action } from "./action";

// TODO: Use uuid for id

export const activity: Activity = {
  id: "claim-polygon-id", // Never change the id
  enabled: false,
  visible: true,
  order: 5,
  title: "Claim a Polygon ID credential",
  shortDescription:
    "Go to the Polygon ID issuer demo app and claim a KYC Age Credential",
  actionLabel: defineMessage({
    id: "activities.claimPolygonId.actionLabel",
    defaultMessage: "Verify",
    description: "Label of the button to start the activity claim polygon id",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimPolygonId.actionExecutingLabel",
    defaultMessage: "Verifying...",
    description:
      "Label of the button when the activity 'claim Polygon ID' is being executed",
  }),
  action: action,
};
