import { EnvironmentType } from "@verida/types";

import { APP_TITLE, VERIDA_CONTEXT_NAME } from "~/constants";

// Application variables
const appTitle = APP_TITLE;

const devMode = process.env.REACT_APP_DEV_MODE === "true" ? true : false;

// Verida variables
const veridaContextName = VERIDA_CONTEXT_NAME;

const veridaConnectLogoUrl = `${window.location.origin}/images/logo_for_verida_connect.png`;

const veridaEnvironment: EnvironmentType =
  process.env.REACT_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.REACT_APP_VERIDA_ENV === "mainnet"
    ? EnvironmentType.MAINNET
    : EnvironmentType.TESTNET;

export const config = {
  appTitle,
  devMode,
  veridaEnvironment,
  veridaContextName,
  veridaConnectLogoUrl,
};
