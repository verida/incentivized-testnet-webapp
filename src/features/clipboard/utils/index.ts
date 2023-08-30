import { Sentry } from "~/features/sentry";

export const copyToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    return false;
  }
  try {
    await navigator.clipboard?.writeText(text);
    return true;
  } catch (error: unknown) {
    Sentry.captureException(error);
    return false;
  }
};
