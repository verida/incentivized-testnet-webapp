import { toast } from "react-hot-toast";
import { defineMessage } from "react-intl";

import { MISSION_01_ID } from "~/features/activity/missions";
import type {
  Activity,
  ActivityOnExecute,
  ActivityOnInit,
} from "~/features/activity/types";
import { wait } from "~/utils";

const ACTIVITY_ID = "create-verida-identity"; // Never change the id

const handleInit: ActivityOnInit = async (
  veridaWebUser,
  _userActivity,
  saveActivity
) => {
  const { status } = await handleExecute(veridaWebUser);
  try {
    await saveActivity({ id: ACTIVITY_ID, status });
    // TODO: Find a way to localised this message (can't use useIntl as not in a hook, may have to pass the i18n object as arg)
    toast.success("Congrats, you have completed the activity");
  } catch (_error: unknown) {
    // No need to capture the error with Sentry as it has been captured by the mutation error handler ... normally
  }
  return () => Promise.resolve();
};

const handleExecute: ActivityOnExecute = async (veridaWebUser) => {
  const isConnected = await veridaWebUser.current.isConnected();
  if (isConnected) {
    return { status: "completed" };
  }
  // Wait a bit for UX purposes or the user will think nothing happened
  await wait(2000);
  return { status: "todo" };
};

export const activity: Activity = {
  id: ACTIVITY_ID,
  missionId: MISSION_01_ID,
  enabled: true,
  visible: true,
  order: 1,
  points: 50,
  title: defineMessage({
    id: "activities.createVeridaIdentity.title",
    defaultMessage: "Create a Verida Identity",
    description: "Title of the activity 'create identity'",
  }),
  shortDescription: defineMessage({
    id: "activities.createVeridaIdentity.shortDescription",
    defaultMessage:
      "Verida identities are an implementation of the Decentralized Identifier (DID) Standard from the W3C. A DID has a unique address (e.g. did:vda:testnet:0x6B2...a6F) that is controlled by an end user with a private key or seed phrase. A user can verify themselves to another user, entity or application by sharing their unique DID address.",
    description: "Short description of the activity 'create identity'",
  }),
  longDescription: defineMessage({
    id: "activities.createVeridaIdentity.longDescription",
    defaultMessage:
      "Verida identities are an implementation of the Decentralized Identifier (DID) Standard from the W3C. A DID has a unique address (e.g. did:vda:testnet:0x6B2...a6F) that is controlled by an end user with a private key or seed phrase. A user can verify themselves to another user, entity or application by sharing their unique DID address.{newline}{newline}Step 1. Install the Verida Wallet (link in resources below) and follow the onboarding to create an identity.{newline}{newline}Step 2. Connect to this Verida Missions webapp with the Verida Wallet, then click the 'Verify' button below.",
    description: "Long description of the activity 'create identity'",
  }),
  actionLabel: defineMessage({
    id: "activities.createVeridaIdentity.actionLabel",
    defaultMessage: "Verify",
    description: "Label of the button to start the activity create identity",
  }),
  actionExecutingLabel: defineMessage({
    id: "activities.createVeridaIdentity.actionExecutingLabel",
    defaultMessage: "Verifying",
    description:
      "Label of the button when the activity 'create Verida Identity' is being executed",
  }),
  resources: [
    {
      label: defineMessage({
        id: "activities.createVeridaIdentity.resources.howToCreateVeridaIdentity.label",
        defaultMessage: "User Guide: How to create a Verida Identity",
        description: "Label of the resource 'How to create a Verida Identity'",
      }),
      url: "https://community.verida.io/user-guides/create-a-verida-identity-guide",
    },
    {
      label: defineMessage({
        id: "activities.createVeridaIdentity.resources.howToCreateVeridaIdentityVideo.label",
        defaultMessage: "Video: How to create a Verida Identity",
        description:
          "Label of the resource 'How to create a Verida Identity' video",
      }),
      url: "https://youtu.be/Iav2TRzBiIs",
    },
    {
      label: defineMessage({
        id: "activities.createVeridaIdentity.resources.walletGuideblogPost.label",
        defaultMessage:
          "Blog: Verida Wallet - The Ultimate Guide to Getting Started",
        description: "Label of the wallet guide blog post resource",
      }),
      url: "https://news.verida.io/verida-wallet-the-ultimate-guide-to-getting-started-998a01cc68b7",
    },
    {
      label: defineMessage({
        id: "activities.createVeridaIdentity.resources.walletInstallLink.label",
        defaultMessage: "Install the Verida Wallet (iOS and Android)",
        description: "Label of the wallet install url resource",
      }),
      url: "https://vault.verida.io/",
    },
  ],
  video: {
    label: defineMessage({
      id: "activities.createVeridaIdentity.video.label",
      defaultMessage: "How to create a Verida Identity",
      description: "Label of the video 'How to create a Verida Identity'",
    }),
    url: "https://www.youtube.com/watch?v=Iav2TRzBiIs",
  },
  onInit: handleInit,
  onExecute: handleExecute,
};
