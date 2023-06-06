import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { HomeView, TermsConditionsView } from "~/components/pages";
import { AppLayout } from "~/components/templates";
import { ErrorBoundary, RouterErrorHandler } from "~/features/errors";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<AppLayout />}
      errorElement={<RouterErrorHandler />}
    >
      <Route index element={<HomeView />} />
      <Route path="terms-and-conditions" element={<TermsConditionsView />} />
    </Route>
  )
);

export const App: React.FunctionComponent = () => {
  return (
    <ErrorBoundary defaultFallbackCardClassName="h-screen w-screen flex flex-col items-center justify-center">
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
