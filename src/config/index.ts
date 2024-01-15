import { EnvironmentType } from "@verida/types";

import { APP_PACKAGE_NAME, VERIDA_CONTEXT_NAME } from "~/constants";
import { LogLevel } from "~/features/logger";

import { version } from "./version";

const devMode = process.env.REACT_APP_DEV_MODE === "true" ? true : false;

// TODO: Use Zod to validate the log level value
const logLevel: LogLevel =
  process.env.REACT_APP_LOG_LEVEL === "error"
    ? "error"
    : process.env.REACT_APP_LOG_LEVEL === "warn"
      ? "warn"
      : process.env.REACT_APP_LOG_LEVEL === "debug"
        ? "debug"
        : "info";

// Verida variables
const veridaContextName = VERIDA_CONTEXT_NAME;

const veridaConnectLogoUrl = `${window.location.origin}/images/logo_for_verida_connect.png`;

const veridaEnvironment: EnvironmentType =
  process.env.REACT_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.REACT_APP_VERIDA_ENV === "mainnet"
      ? EnvironmentType.MAINNET
      : EnvironmentType.TESTNET;

const veridaRpcUrl = process.env.REACT_APP_VERIDA_RPC_URL || undefined;

export const config = {
  appVersion: version,
  devMode,
  logLevel,
  verida: {
    environment: veridaEnvironment,
    contextName: veridaContextName,
    connectLogoUrl: veridaConnectLogoUrl,
    rpcUrl: veridaRpcUrl,
  },
  sentry: {
    enabled: process.env.REACT_APP_SENTRY_ENABLED === "false" ? false : true,
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
    release: `${APP_PACKAGE_NAME}@${version}`,
    tracesSampleRate: Number(
      process.env.REACT_APP_SENTRY_TRACE_SAMPLE_RATE || 0.1
    ),
    replaysSessionSampleRate: Number(
      process.env.REACT_APP_SENTRY_REPLAY_SESSION_SAMPLE_RATE || 0.1
    ),
    replaysOnErrorSampleRate: Number(
      process.env.REACT_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || 1.0
    ),
  },
};
