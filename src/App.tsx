import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { HomeView } from "~/components/pages";
import { AppLayout } from "~/components/templates";
import { AppContextProviders } from "~/contexts";
import { ErrorBoundary, RouterErrorHandler } from "~/features/errors";
import { Sentry } from "~/features/sentry";

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const router = sentryCreateBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      errorElement={<RouterErrorHandler />}
    >
      <Route index element={<HomeView />} />
      {/* <Route path="terms-and-conditions" element={<TermsConditionsView />} /> */}
    </Route>
  )
);

export const App: React.FunctionComponent = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary
        noIntl
        defaultFallbackCardClassName="h-screen w-screen flex flex-col items-center justify-center"
      >
        <AppContextProviders>
          <ErrorBoundary defaultFallbackCardClassName="h-screen w-screen flex flex-col items-center justify-center">
            <RouterProvider router={router} />
          </ErrorBoundary>
        </AppContextProviders>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export const AppWithSentry = Sentry.withProfiler(App);
