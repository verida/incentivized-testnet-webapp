import { EnvironmentType } from "@verida/types";

import { APP_TITLE, VERIDA_CONTEXT_NAME } from "~/constants";

// Application variables
const appTitle = APP_TITLE;

// Verida variables
const veridaContextName = VERIDA_CONTEXT_NAME;

const veridaLogoUrl = process.env.REACT_APP_VERIDA_APP_LOGO_URL;

const veridaEnvironment: EnvironmentType =
  process.env.REACT_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.REACT_APP_VERIDA_ENV === "mainnet"
    ? EnvironmentType.MAINNET
    : EnvironmentType.TESTNET;

export const config = {
  appTitle,
  veridaEnvironment,
  veridaContextName,
  veridaLogoUrl,
};
