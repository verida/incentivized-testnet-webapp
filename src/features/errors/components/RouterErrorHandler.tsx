import React from "react";
import { useRouteError } from "react-router-dom";

import { useErrorBoundary } from "~/features/errors/hooks";

/**
 * This component is simply forwarding the router errors to the closest ErrorBoundary
 */
export const RouterErrorHandler: React.FunctionComponent = () => {
  const error = useRouteError();
  const { showBoundary } = useErrorBoundary();
  showBoundary(error);
  return null;
};
