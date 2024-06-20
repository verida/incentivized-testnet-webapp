import React, { useCallback } from "react";
import { useIntl } from "react-intl";

import { Button, Icon } from "~/components/atoms";
import { useVerida } from "~/features/verida";

export type ConnectVeridaButtonProps = {
  longLabel?: boolean;
};

export const ConnectVeridaButton: React.FunctionComponent<
  ConnectVeridaButtonProps
> = (props) => {
  const { longLabel = false } = props;

  const i18n = useIntl();
  const { connect, isConnecting, isCheckingConnection } = useVerida();

  const handleConnect = useCallback(() => {
    void connect();
  }, [connect]);

  const checkingConnectionButtonLabel = i18n.formatMessage({
    id: "ConnectVeridaButton.checkingConnectionButtonLabel",
    description:
      "Label of the Connect to Verida button when checking if already conencted. Note, the button has a spinner next to this label",
    defaultMessage: "Checking",
  });

  const connectButtonLabel = i18n.formatMessage({
    id: "ConnectVeridaButton.connectButtonLabel",
    description: "Label of the Connect to Verida button",
    defaultMessage: "Connect",
  });

  const connectButtonLongLabel = i18n.formatMessage({
    id: "ConnectVeridaButton.connectButtonLongLabel",
    description: "Long label of the Connect to Verida button",
    defaultMessage: "Connect to Verida Network",
  });

  const connectingButtonLabel = i18n.formatMessage({
    id: "ConnectVeridaButton.connectingButtonLabel",
    description:
      "Label of the Connect to Verida button when connecting. Note, the button has a spinner next to this label",
    defaultMessage: "Connecting",
  });

  return (
    <Button
      onClick={handleConnect}
      variant="contained"
      color="primary"
      disabled={isConnecting || isCheckingConnection}
      size="medium"
    >
      {isConnecting || isCheckingConnection ? (
        <Icon size={20} type="loading" className="animate-spin-slow" />
      ) : null}
      {isCheckingConnection
        ? checkingConnectionButtonLabel
        : isConnecting
          ? connectingButtonLabel
          : longLabel
            ? connectButtonLongLabel
            : connectButtonLabel}
    </Button>
  );
};
