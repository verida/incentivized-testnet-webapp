import React, { useCallback } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import {
  ErrorFallbackCard,
  RawErrorFallbackCard,
} from "~/components/molecules";
import { Sentry } from "~/features/sentry";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  /** When using the default fallback, define the className of the fallback card component */
  defaultFallbackCardClassName?: string;
  /** When using the default fallback, use a version not relying on IntlProvider */
  noIntl?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<typeof ReactErrorBoundary>,
  "fallback" | "FallbackComponent"
>;

/**
 * Error boundary to use to catch and handle all unexpected errors. It displays a default fallback UI that can be overriden with the prop `fallbackRender`.
 *
 * Use the `onReset` to define the handler for the fallback UI to reset the error boundary. The default action is to reload the page.
 *
 * This error boundary will log the error.
 */
export const ErrorBoundary: React.FunctionComponent<ErrorBoundaryProps> = (
  props
) => {
  const {
    children,
    onError,
    onReset,
    fallbackRender,
    defaultFallbackCardClassName,
    noIntl = false,
    ...otherProps
  } = props;

  const handleError = useCallback(
    (error: Error, info: { componentStack: string }) => {
      Sentry.captureException(error);
      onError && onError(error, info);
    },
    [onError]
  );

  return (
    <ReactErrorBoundary
      {...otherProps}
      fallbackRender={
        fallbackRender
          ? fallbackRender
          : (errorDetails) => {
              return noIntl ? (
                <RawErrorFallbackCard
                  {...errorDetails}
                  className={defaultFallbackCardClassName}
                />
              ) : (
                <ErrorFallbackCard
                  {...errorDetails}
                  className={defaultFallbackCardClassName}
                />
              );
            }
      }
      onError={handleError}
      onReset={(details) => {
        onReset ? onReset(details) : window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};
