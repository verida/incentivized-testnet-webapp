import React from "react";
import { useIntl } from "react-intl";

import { Button, Typography } from "~/components/atoms";
import { useWalletConnect } from "~/features/walletconnect";

export type AirdropCheckCryptoWalletModalContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

export const AirdropCheckCryptoWalletModalContent: React.FC<
  AirdropCheckCryptoWalletModalContentProps
> = (props) => {
  const { ...divProps } = props;

  const { address, isConnected, disconnect } = useWalletConnect();

  const i18n = useIntl();

  const informationMessage = i18n.formatMessage({
    id: "AirdropCheckCryptoWalletModalContent.informationMessage",
    defaultMessage:
      "To claim this airdrop, we need you to connect your crypto wallet and we will ask you to sign a message to prove you own this wallet.",
    description: "",
  });

  const connectInformationMessage = i18n.formatMessage({
    id: "AirdropCheckCryptoWalletModalContent.connectInformationMessage",
    defaultMessage: "Please connect your crypto wallet first.",
    description: "",
  });

  const connectedAddressMessage = i18n.formatMessage({
    id: "AirdropCheckCryptoWalletModalContent.connectedAddressMessage",
    defaultMessage: "You are connected with:",
    description: "",
  });

  const disconnectButtonLabel = i18n.formatMessage({
    id: "AirdropCheckCryptoWalletModalContent.disconnectButtonLabel",
    defaultMessage: "Disconnect",
    description: "",
  });

  const signInformationMessage = i18n.formatMessage({
    id: "AirdropCheckCryptoWalletModalContent.signInformationMessage",
    defaultMessage: "Please sign the message to prove your ownership.",
    description: "",
  });

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-8">
        <Typography variant="base">{informationMessage}</Typography>
        {!isConnected ? (
          <Typography variant="base">{connectInformationMessage}</Typography>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <Typography variant="base">{connectedAddressMessage}</Typography>
              <Typography variant="base" className="truncate">
                {address}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={disconnect}
              >
                {disconnectButtonLabel}
              </Button>
            </div>
            <Typography variant="base">{signInformationMessage}</Typography>
          </>
        )}
      </div>
    </div>
  );
};
