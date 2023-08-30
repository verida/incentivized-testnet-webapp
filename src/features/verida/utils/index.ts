import { WebUser } from "@verida/web-helpers";

import { Logger } from "~/features/logger";
import {
  SendDataRequestData,
  type SendDataRequestOptions,
  SendMessageData,
  type SendSimpleMessageOptions,
  type SentMessage,
  SimpleMessage,
  VAULT_CONTEXT_NAME,
  VERIDA_DID_REGEXP,
  VeridaMessageType,
} from "~/features/verida";

const logger = new Logger("verida");

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

export function isValidVeridaDid(maybeDid: string) {
  return VERIDA_DID_REGEXP.test(maybeDid);
}

export async function getMessaging(veridaWebUser: WebUser) {
  const context = await veridaWebUser.getContext();
  return context.getMessaging();
}

export async function sendDataRequest(
  veridaWebUser: WebUser,
  options: SendDataRequestOptions
): Promise<SentMessage | null> {
  const opts: SendDataRequestOptions = Object.assign(
    {
      userSelectLimit: 1,
      userSelect: true,
    },
    options
  );

  logger.info("Getting the DID, Context and Messaging");

  const did = await veridaWebUser.getDid();
  const messaging = await getMessaging(veridaWebUser);

  const messageType = VeridaMessageType.DATA_REQUEST;

  const dataToSend: SendDataRequestData = {
    requestSchema: opts.requestSchema,
    filter: opts.filter,
    userSelectLimit: opts.userSelectLimit,
    userSelect: opts.userSelect,
  };

  logger.info("Sending data request", { did, messageType, data: dataToSend });

  const sentMessage = await messaging.send(
    did,
    messageType,
    dataToSend,
    opts.messageSubject,
    {
      recipientContextName: VAULT_CONTEXT_NAME,
      did,
    }
  );

  logger.info("Data request sent", { did, messageType, data: dataToSend });

  // The `messaging.sent` function is poorly typed so have to cast
  return sentMessage as SentMessage | null;
}

export async function sendMessage(
  veridaWebUser: WebUser,
  options: SendSimpleMessageOptions
) {
  logger.info("Getting the DID, Context and Messaging");

  const userDid = await veridaWebUser.getDid();
  const messaging = await getMessaging(veridaWebUser);

  const messageType = VeridaMessageType.SIMPLE_MESSAGE;

  const dataToSend: SendMessageData<SimpleMessage> = {
    data: {
      data: [
        {
          message: options.message,
          subject: options.subject,
          link: options.link,
        },
      ],
    },
  };

  const targetDid = options.targetDid || userDid;
  const targetContext = options.targetContext || VAULT_CONTEXT_NAME;

  logger.info("Sending message", {
    did: userDid,
    targetDid,
    targetContext,
    messageType,
    data: dataToSend,
  });

  const sentMessage = await messaging.send(
    targetDid,
    messageType,
    dataToSend,
    options.messageSubject || options.subject,
    {
      recipientContextName: targetContext,
      did: targetDid,
    }
  );

  logger.info("Message sent", {
    did: userDid,
    targetDid,
    targetContext,
    messageType,
    data: dataToSend,
  });

  // The `messaging.sent` function is poorly typed so have to cast
  return sentMessage as SentMessage | null;
}
