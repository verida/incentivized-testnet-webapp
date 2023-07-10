import { defineMessage } from "react-intl";

import { handleInitActivityCheckMessage } from "~/features/activity";
import { MISSION_02_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { Sentry } from "~/features/sentry";
import {
  VAULT_CREDENTIAL_SCHEMA_URL,
  sendDataRequest,
} from "~/features/verida";

import { GATEKEEPER_ADOPTER_VC_SCHEMA_URL } from "./constants";
import { verifyReceivedMessage } from "./utils";

const ACTIVITY_ID = "claim-gatekeeper-adopter-credential"; // Never change the id

const handleInit: ActivityOnInit = async (
  veridaWebUser,
  userActivity,
  saveActivity
) => {
  return handleInitActivityCheckMessage({
    activityId: ACTIVITY_ID,
    userActivity,
    veridaWebUser: veridaWebUser.current,
    verifyReceivedMessage,
    saveActivity,
    // TODO: Make a localised message of this message
    successToastMessage:
      "Congrats, you have completed the activity 'Claim a GateKeeper Adopter credential'",
  });
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  try {
    // TODO: Make a localised message of this message
    const message = "Please share a GateKeeper Adopter credential";

    const sentMessage = await sendDataRequest(veridaWebUser.current, {
      messageSubject: message,
      requestSchema: VAULT_CREDENTIAL_SCHEMA_URL,
      filter: {
        credentialSchema: GATEKEEPER_ADOPTER_VC_SCHEMA_URL,
      },
    });

    return {
      status: "pending",
      data: {
        requestId: sentMessage?.id,
      },
      message: defineMessage({
        id: "activities.claimGateKeperAdopter.executePendingMessage",
        defaultMessage:
          "A request has been sent to your Wallet inbox. Please check your inbox and share a GateKeeper Adopter credential.",
        description:
          "Message explaining a request has been sent to the their Wallet inbox",
      }),
    };
  } catch (error: unknown) {
    Sentry.captureException(error);
    return {
      status: "todo",
      message: defineMessage({
        id: "activity.claimGateKeperAdopter.gettingExecutionErrorMessage",
        defaultMessage: `There was an error while sending you the credential request, please try again later`,
        description: "Error message when we can't get the user profile",
      }),
    };
  }
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_02_ID,
  enabled: false,
  visible: false,
  order: 2,
  points: 50,
  title: defineMessage({
    id: "activities.claimGateKeperAdopter.title",
    defaultMessage: "Claim a GateKeeper Adopter credential",
    description: "Title of the activity 'Claim Gatekeeper Adopter credential'",
  }),
  shortDescription: defineMessage({
    id: "activities.claimGateKeperAdopter.shortDescription",
    defaultMessage:
      "Go to the GateKeeper claim page and start the process. You will have the connect with your Verida Wallet and then claim the Credential by scanning the QR code again. Once saved in your Wallet, share this credential by replying to the message you received in your inbox.",
    description:
      "Short description of the activity 'claim GateKeeper Adopter credential'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimGateKeperAdopter.actionLabel",
    defaultMessage: "Send Request",
    description:
      "Label of the button to start the activity claim GateKeeper Adopter credential",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimGateKeperAdopter.actionExecutingLabel",
    defaultMessage: "Sending Request",
    description:
      "Label of the button when the activity 'claim GateKeeper Adopter credential' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  resources: [
    {
      label: defineMessage({
        id: "activities.claimGateKeperAdopter.resources.gatekeeperClaimPageUrl.label",
        defaultMessage: "GateKeeper claim page",
        description: "Label of the resource 'GateKeeper claim page'",
      }),
      url: "https://gatekeeper.software/claim?vcId=582636f6-a43d-46f8-9d7c-d50424e92d93",
    },
  ],
};
