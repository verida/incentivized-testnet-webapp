import { type ReceivedMessage } from "~/features/verida";

export function verifyReceivedMessage(
  message: ReceivedMessage<unknown>
): boolean {
  const data = message.data.data[0];
  if (data === undefined) {
    return false;
  }

  // TODO: Consider using the issuer DID and the type instead of the schema

  return true;
}
