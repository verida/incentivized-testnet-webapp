import React, { useCallback } from "react";
import { useIntl } from "react-intl";

import { Button, Icon } from "~/components/atoms";
import { useVerida } from "~/features/verida";

export const ConnectVeridaButton: React.FunctionComponent = () => {
  const i18n = useIntl();
  const { connect, isConnecting, isCheckingConnection } = useVerida();

  const handleConnect = useCallback(() => {
    void connect();
  }, [connect]);

  const checkingConnectionButtonLabel = i18n.formatMessage({
    id: "ConnectVeridaButton.checkingConnectionButtonLabel",
    description:
      "Label of the disabled Checking Verida  button in each activity card",
    defaultMessage: "Checking",
  });

  const connectButtonLabel = i18n.formatMessage({
    id: "ConnectVeridaButton.connectButtonLabel",
    description: "Label of the Connect button in each activity card",
    defaultMessage: "Connect",
  });

  const connectingButtonLabel = i18n.formatMessage({
    id: "ConnectVeridaButton.connectingButtonLabel",
    description:
      "Label of the disabled Connecting button in each activity card",
    defaultMessage: "Connecting",
  });

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting || isCheckingConnection}
      size="medium"
    >
      {isConnecting || isCheckingConnection ? (
        <Icon size={16} type="loading" className="animate-spin-slow mr-2" />
      ) : null}
      {isCheckingConnection
        ? checkingConnectionButtonLabel
        : isConnecting
        ? connectingButtonLabel
        : connectButtonLabel}
    </Button>
  );
};
