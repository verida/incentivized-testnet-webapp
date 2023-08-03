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
    ignoreErrors: [
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
