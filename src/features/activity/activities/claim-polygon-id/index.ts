import type { IMessaging } from "@verida/types";
import toast from "react-hot-toast";
import { defineMessage } from "react-intl";

import { MISSION_02_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { Sentry } from "~/features/sentry";
import {
  type ReceivedMessage,
  VAULT_CREDENTIAL_SCHEMA_URL,
  sendDataRequest,
} from "~/features/verida";

import { POLYGON_ID_KYC_AGE_VC_SCHEMA_URL } from "./constants";
import { verifyReceivedMessage } from "./utils";

const ACTIVITY_ID = "claim-polygon-id"; // Never change the id

const handleInit: ActivityOnInit = async (
  veridaWebUser,
  userActivity,
  saveActivity
) => {
  const checkMessage = async (message: ReceivedMessage<unknown>) => {
    try {
      const verified = verifyReceivedMessage(message);
      if (!verified) {
        return;
      }

      await saveActivity({
        id: ACTIVITY_ID,
        status: "completed",
        data: {},
      });

      toast.success(
        "Congrats, you have completed the activity 'Claim a Polygon ID Age credential'"
      );
    } catch (error: unknown) {
      Sentry.captureException(error);
    }
  };

  let messaging: IMessaging | undefined;
  try {
    const context = await veridaWebUser.current.getContext();
    messaging = await context.getMessaging();

    const existingRequestId = userActivity?.data?.requestId;

    if (existingRequestId) {
      const messages = (await messaging.getMessages()) as
        | ReceivedMessage<unknown>[]
        | undefined;

      if (messages) {
        void Promise.allSettled(
          messages
            .filter((message) => message.data.replyId === existingRequestId)
            .map(checkMessage)
        );
      }
    }

    void messaging.onMessage(checkMessage);
  } catch (error: unknown) {
    Sentry.captureException(error);
  }
  return async () => {
    try {
      if (messaging) await messaging.offMessage(checkMessage);
    } catch (error: unknown) {
      Sentry.captureException(error);
    }
  };
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  try {
    // TODO: Make a localised message of this message
    const message = "Please share a Polygon ID KYC Age credential";

    const sentMessage = await sendDataRequest(veridaWebUser.current, {
      messageSubject: message,
      requestSchema: VAULT_CREDENTIAL_SCHEMA_URL,
      filter: {
        credentialSchema: POLYGON_ID_KYC_AGE_VC_SCHEMA_URL,
      },
    });

    return {
      status: "pending",
      data: {
        requestId: sentMessage?.id,
      },
      message: defineMessage({
        id: "activities.claimPolygonId.executePendingMessage",
        defaultMessage:
          "A request has been sent to your Wallet inbox. Please check your inbox and share a Polygon ID KYC Age credential.",
        description:
          "Message explaining a request has been sent to the their Wallet inbox",
      }),
    };
  } catch (error: unknown) {
    Sentry.captureException(error);
    return {
      status: "todo",
      message: defineMessage({
        id: "activity.claimPolygonId.gettingExecutionErrorMessage",
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
  order: 1,
  points: 50,
  title: defineMessage({
    id: "activities.claimPolygonId.title",
    defaultMessage: "Claim a Polygon ID Age credential",
    description: "Title of the activity 'claim Polygon ID'",
  }),
  shortDescription: defineMessage({
    id: "activities.claimPolygonId.shortDescription",
    defaultMessage:
      "Go to the Polygon ID issuer demo app and claim a KYC Age Credential, then share this credential by replying to the message you received in your inbox.",
    description: "Short description of the activity 'claim Polygon ID'",
  }),
  actionLabel: defineMessage({
    id: "activities.claimPolygonId.actionLabel",
    defaultMessage: "Send Request",
    description: "Label of the button to start the activity claim polygon id",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.claimPolygonId.actionExecutingLabel",
    defaultMessage: "Sending Request",
    description:
      "Label of the button when the activity 'claim Polygon ID' is being executed",
  }),
  onInit: handleInit,
  onExecute: handleExecute,
  resources: [
    {
      label: defineMessage({
        id: "activities.claimPolygonId.resources.polygonIdDemoAppUrl.label",
        defaultMessage: "Polygon ID demo app",
        description: "Label of the resource 'Polygon ID issuer demo app'",
      }),
      url: "https://issuer-demo-testing-mainnet.polygonid.me/",
    },
  ],
};
