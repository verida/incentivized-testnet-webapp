import React from "react";
import { type FallbackProps } from "react-error-boundary";
import { defineMessage, useIntl } from "react-intl";

import { Button, Typography } from "~/components/atoms";

const cardTitleDefinition = defineMessage({
  id: "ErrorFallbackCard.cardTtitle",
  defaultMessage: "Oops, something went wrong!",
  description: "Title of the default error fallback card",
});

const cardMessageDefinition = defineMessage({
  id: "ErrorFallbackCard.cardMessage",
  defaultMessage:
    "If the error persists, try refreshing your browser and cleaning your browser's data.",
  description: "Message of the default error fallback card",
});

const resetButtonLabelDefinition = defineMessage({
  id: "ErrorFallbackCard.resetButtonLabel",
  defaultMessage: "Try again",
  description:
    "Label of the 'Try Again' button displayed on the default error fallback card",
});

export interface RawErrorFallbackCardProps extends FallbackProps {
  title?: string;
  message?: string;
  resetButtonLabel?: string;
}

/**
 * Card component displaying a title, message and a button aiming at informing
 * users about an error, the button aims at reseting or retrying.
 *
 * This component has default messages but are not i18n, so that it can be used
 * outside of the IntlProvider, ie: at the very root of the DOM.
 *
 * Consider using the `ErrorFallbackCard` component for a i18n  equivalent.
 */
export const RawErrorFallbackCard: React.FunctionComponent<
  RawErrorFallbackCardProps & React.ComponentPropsWithRef<"div">
> = (props) => {
  const {
    resetErrorBoundary,
    title = cardTitleDefinition.defaultMessage,
    message = cardMessageDefinition.defaultMessage,
    resetButtonLabel = resetButtonLabelDefinition.defaultMessage,
    ...divProps
  } = props;

  return (
    <div {...divProps}>
      <div className="flex flex-col items-center justify-center rounded-xl bg-gray-dark p-4">
        <span className="mb-2 text-lg font-semibold">{title}</span>
        <Typography className="mb-4">{message}</Typography>
        <div className="w-full">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={resetErrorBoundary}
          >
            {resetButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Card component displaying a title, message and a button aiming at informing
 * users about an error, the button aims at reseting or retrying.
 *
 * This component uses the `useIntl` hook, so must be inside the IntlProvider.
 */
export const ErrorFallbackCard: React.FunctionComponent<
  React.ComponentPropsWithRef<typeof RawErrorFallbackCard>
> = (props) => {
  const { title, message, resetButtonLabel, ...otherProps } = props;

  const i18n = useIntl();

  const cardTitle = title || i18n.formatMessage(cardTitleDefinition);
  const cardMessage = message || i18n.formatMessage(cardMessageDefinition);
  const buttonLabel =
    resetButtonLabel || i18n.formatMessage(resetButtonLabelDefinition);

  return (
    <RawErrorFallbackCard
      {...otherProps}
      title={cardTitle}
      message={cardMessage}
      resetButtonLabel={buttonLabel}
    />
  );
};
