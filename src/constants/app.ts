import { defineMessage } from "react-intl";

export const APP_PACKAGE_NAME = "incentivized-testnet-webapp";
export const VERIDA_CONTEXT_NAME = "Verida Missions";
export const APP_TITLE = "Verida Missions";

/** Default application title for the meta tags */
export const DEFAULT_META_TITLE = defineMessage({
  id: "app.meta.defaultTitle",
  defaultMessage:
    "Verida Missions: Explore Decentralized Identity and Private Data Storage",
  description: "Default application title for the meta tags",
});

/** Default application description for the meta tags */
export const DEFAULT_META_DESCRIPTION = defineMessage({
  id: "app.meta.defaultDescription",
  defaultMessage:
    "Discover the future of web3 on the Verida Network. Join the incentivized testnet and experience secure decentralized data storage, zero-knowledge credentials, and more.",
  description: "Default application description for the meta tags",
});
