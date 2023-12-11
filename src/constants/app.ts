import { defineMessage } from "react-intl";

export const APP_PACKAGE_NAME = "incentivized-testnet-webapp";
export const VERIDA_CONTEXT_NAME = "Verida Missions";
export const APP_TITLE = "Verida Missions";

/** Default application title for the meta tags */
export const DEFAULT_META_TITLE = defineMessage({
  id: "app.meta.defaultTitle",
  defaultMessage:
    "Verida Missions: Discover the future of personal data control and ownership.",
  description: "Default application title for the meta tags",
});

/** Default application description for the meta tags */
export const DEFAULT_META_DESCRIPTION = defineMessage({
  id: "app.meta.defaultDescription",
  defaultMessage:
    "Explore a new paradigm shift for managing your personal data with self-sovereign technology. Experience Verida Wallet, with zero-knowledge credentials, decentralized identity and access to a private data storage network designed for web3.",
  description: "Default application description for the meta tags",
});
