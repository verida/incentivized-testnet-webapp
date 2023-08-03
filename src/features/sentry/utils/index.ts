import * as Sentry from "@sentry/react";
// TODO: Optimise with Sentry tree shaking
import React from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { config } from "~/config";

export function initSentry() {
  if (!config.sentry.dsn) {
    return;
  }

  Sentry.init({
    enabled: config.sentry.enabled,
    dsn: config.sentry.dsn,
    environment: config.sentry.environment,
    release: config.sentry.release,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ["localhost"],
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: config.sentry.tracesSampleRate,
    // Session Replay
    replaysSessionSampleRate: config.sentry.replaysSessionSampleRate,
    replaysOnErrorSampleRate: config.sentry.replaysOnErrorSampleRate,
    beforeSend: (event, hint) => {
      if (hint.originalException instanceof Error) {
        return event;
      }

      // FIXME: We have a lot of events which are not instances of Error, they are not really helpful in Sentry. Analysis of these, reveals they are coming from extensions and/or third-party libs, so decided to not reporting them. We take the risk to miss our own wrong non-errors but it's worth it short term.
      return null;
    },
    ignoreErrors: [
      /__SENTRY_LOADER__/i,
      /firefoxSample/i,
      /Talisman/i, // That's an extension
      /Failed to execute 'insertBefore' on 'Node'/i, // Coming from react itself
      /Failed to execute 'removeChild' on 'Node'/i, // Coming from react itself
      "window.ethereum.setConfig is not a function",
      "Failed to fetch", // TODO: Remove when we have a better solution
    ],
    denyUrls: [
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extension:\/\//i,
      // Mozilla extensions
      /^moz-extension:\/\//i,
    ],
  });
}
