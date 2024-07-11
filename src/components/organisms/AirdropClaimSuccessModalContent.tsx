import React from "react";
import { useIntl } from "react-intl";

import AirdropSuccessImage from "~/assets/images/airdrop_success.png";
import { ExternalLink, Typography } from "~/components/atoms";
import { ShareOnSocials } from "~/components/molecules";

export type AirdropClaimSuccessModalContentProps = {
  claimedTokenAmount?: number;
  transactionExplorerUrl?: string;
} & Omit<React.ComponentProps<"div">, "children">;

export const AirdropClaimSuccessModalContent: React.FC<
  AirdropClaimSuccessModalContentProps
> = (props) => {
  const { transactionExplorerUrl, claimedTokenAmount, ...divProps } = props;

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "AirdropClaimSuccessModalContent.title",
    defaultMessage: "Congratulations!",
    description: "Title in the content of the airdrop claim success modal",
  });

  const subtitle = i18n.formatMessage({
    id: "AirdropClaimSuccessModalContent.subtitle",
    defaultMessage: "You have successfully claimed your Verida airdrop",
    description: "Subtitle in the content of the airdrop claim success modal",
  });

  const transactionExplorerLinkLabel = i18n.formatMessage({
    id: "AirdropClaimSuccessModalContent.transactionExplorerLinkLabel",
    defaultMessage: "Check the transaction",
    description:
      "Message to view the transaction on Etherscan in the content of the airdrop claim success modal",
  });

  const claimedAmountLabel = i18n.formatMessage({
    id: "AirdropClaimSuccessModalContent.claimedAmountLabel",
    defaultMessage: "Claimed VDA",
    description:
      "Label for the claimed amount in the content of the airdrop claim success modal",
  });

  const shareOnSocialsMessage = i18n.formatMessage({
    id: "AirdropClaimSuccessModalContent.shareOnSocialsMessage",
    defaultMessage: "Share your airdrop with the community",
    description:
      "Message to share the success on socials in the content of the airdrop claim success modal",
  });

  const sharedMessageOnSocialsText = i18n.formatMessage({
    id: "AirdropClaimSuccessModalContent.sharedMessageOnSocialsText",
    description: "Message shared on social after submitted the proof",
    defaultMessage:
      "I have successfully claimed my @verida_io airdrop at https://missions.verida.network/",
  });

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-8 items-center">
        <div>
          <img src={AirdropSuccessImage} alt="" className="h-20" />
        </div>
        <div className="flex flex-col gap-3 items-center text-center">
          <Typography variant="heading-l">{title}</Typography>
          <Typography variant="base">{subtitle}</Typography>
          {transactionExplorerUrl ? (
            <ExternalLink href={transactionExplorerUrl} openInNewTab>
              {transactionExplorerLinkLabel}
            </ExternalLink>
          ) : null}
        </div>
        <div className="w-full border border-border rounded-xl bg-clip-padding bg-gradient-to-br from-primary/30 to-black/30 p-4 flex flex-col items-start gap-3">
          <Typography variant="heading-s" component="p">
            {claimedAmountLabel}
          </Typography>
          <Typography variant="heading-m" component="p">
            {String(claimedTokenAmount ?? "-")}
          </Typography>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <Typography variant="base">{shareOnSocialsMessage}</Typography>
          <ShareOnSocials sharedMessage={sharedMessageOnSocialsText} />
        </div>
      </div>
    </div>
  );
};
