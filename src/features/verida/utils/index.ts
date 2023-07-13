import { WebUser } from "@verida/web-helpers";

import { Sentry } from "~/features/sentry";
import { VAULT_CONTEXT_NAME } from "~/features/verida/constants";
import type {
  SendDataRequestOptions,
  SentDataRequest,
} from "~/features/verida/types";

export function truncateDid(
  did: string,
  nbLeadingChar = 5,
  ndTrailingChar = 2
) {
  const elements = did.split(":");
  const key = elements[elements.length - 1];
  const truncatedKey =
    key.substring(0, nbLeadingChar) +
    "..." +
    key.substring(key.length - ndTrailingChar, key.length);
  return did.replace("did:", "").replace(key, truncatedKey);
}

export async function sendDataRequest(
  veridaWebUser: WebUser,
  options: SendDataRequestOptions
): Promise<SentDataRequest | null> {
  const opts: SendDataRequestOptions = Object.assign(
    {
      userSelectLimit: 1,
      userSelect: true,
    },
    options
  );

  Sentry.addBreadcrumb({
    category: "verida",
    level: "info",
    message: "Getting all the DID, Context and Messaging",
  });

  const did = await veridaWebUser.getDid();
  const context = await veridaWebUser.getContext();
  const messaging = await context.getMessaging();

  const messageType = "inbox/type/dataRequest";

  const messageData = {
    requestSchema: opts.requestSchema,
    filter: opts.filter,
    userSelectLimit: opts.userSelectLimit,
    userSelect: opts.userSelect,
  };

  Sentry.addBreadcrumb({
    category: "verida",
    level: "info",
    message: "Sending data request",
    data: { did, messageType, messageData },
  });

  const sentMessage = await messaging.send(
    did,
    messageType,
    messageData,
    opts.messageSubject,
    {
      recipientContextName: VAULT_CONTEXT_NAME,
      did,
    }
  );

  Sentry.addBreadcrumb({
    category: "verida",
    level: "info",
    message: "Data request sent",
    data: { did, messageType, messageData },
  });

  // The `messaging.sent` function is poorly typed so has to cast
  return sentMessage as SentDataRequest | null;
}
