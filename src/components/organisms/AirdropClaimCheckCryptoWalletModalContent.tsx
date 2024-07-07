import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { useWalletConnect } from "~/features/walletconnect";

export type AirdropClaimCheckCryptoWalletModalContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

export const AirdropClaimCheckCryptoWalletModalContent: React.FC<
  AirdropClaimCheckCryptoWalletModalContentProps
> = (props) => {
  const { ...divProps } = props;

  const { isConnected } = useWalletConnect();

  const i18n = useIntl();

  const informationMessage = i18n.formatMessage({
    id: "AirdropClaimCheckCryptoWalletModalContent.informationMessage",
    defaultMessage:
      "To claim this airdrop, we need you to connect your crypto wallet and we will ask you to sign a message to prove you own this wallet.",
    description: "",
  });

  const connectInformationMessage = i18n.formatMessage({
    id: "AirdropClaimCheckCryptoWalletModalContent.connectInformationMessage",
    defaultMessage: "Please proceed in connecting your crypto wallet.",
    description: "",
  });

  const signInformationMessage = i18n.formatMessage({
    id: "AirdropClaimCheckCryptoWalletModalContent.signInformationMessage",
    defaultMessage: "Please sign the message to prove your ownership.",
    description: "",
  });

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-8">
        <Typography variant="base">{informationMessage}</Typography>
        <Typography variant="base">
          {isConnected ? signInformationMessage : connectInformationMessage}
        </Typography>
      </div>
    </div>
  );
};
