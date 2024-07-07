import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";

export type AirdropClaimConfirmationModalContentProps = {
  claimableTokenAmount: number;
  blockchainAddress?: string;
} & Omit<React.ComponentProps<"div">, "children">;

export const AirdropClaimConfirmationModalContent: React.FC<
  AirdropClaimConfirmationModalContentProps
> = (props) => {
  const { blockchainAddress, claimableTokenAmount, ...divProps } = props;

  const i18n = useIntl();

  const confirmationMessage = i18n.formatMessage({
    id: "AirdropClaimConfirmationModalContent.confirmationMessage",
    defaultMessage:
      "You are registered for the airdrop! Please proceed with the claim to receive your tokens on your address on the Polygon blockchain.",
    description:
      "Message in the content of the airdrop claim confirmation modal",
  });

  const claimableTokenAmountLabel = i18n.formatMessage({
    id: "AirdropClaimConfirmationModalContent.claimableTokenAmountLabel",
    defaultMessage: "You will receive",
    description:
      "Label for the claimable token amount in the content of the airdrop claim confirmation modal",
  });

  const claimableTokenAmountAsString = i18n.formatMessage(
    {
      id: "AirdropClaimConfirmationModalContent.claimableTokenAmountLabel",
      defaultMessage: "{amount, number} VDA",
      description:
        "Claimable token amount in the content of the airdrop claim confirmation modal",
    },
    {
      amount: claimableTokenAmount,
    }
  );

  const userAddressLabel = i18n.formatMessage({
    id: "AirdropClaimConfirmationModalContent.userAddressLabel",
    defaultMessage: "On your wallet address",
    description:
      "Label for the user address in the content of the airdrop claim confirmation modal",
  });

  const sponsoredTransactionFees = i18n.formatMessage({
    id: "AirdropClaimConfirmationModalContent.sponsoredTransactionFees",
    defaultMessage: "Verida is sponsoring the transaction fees.",
    description:
      "Message saying the transaction fees are sponsored in the content of the airdrop claim modal",
  });

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-8">
        <Typography variant="base">{confirmationMessage}</Typography>
        <div className="border border-border rounded-xl bg-clip-padding bg-gradient-to-br from-primary/30 to-black/30 p-4 flex flex-col items-start gap-3">
          <Typography variant="heading-xs" component="p">
            {claimableTokenAmountLabel}
          </Typography>
          <Typography variant="heading-m" component="p">
            {claimableTokenAmountAsString}
          </Typography>
        </div>
        <div className="border border-border rounded-xl bg-clip-padding bg-gradient-to-br from-primary/30 to-black/30 p-4 flex flex-col items-start gap-3">
          <Typography variant="heading-xs" component="p">
            {userAddressLabel}
          </Typography>
          <div className="w-full">
            <Typography
              variant="heading-s"
              component="p"
              className="line-clamp-1"
            >
              <>{blockchainAddress ?? "-"}</>
            </Typography>
          </div>
        </div>
        <Typography variant="base-s">{sponsoredTransactionFees}</Typography>
      </div>
    </div>
  );
};
