import React from "react";
import { useIntl } from "react-intl";

import AirdropSuccessImage from "~/assets/images/airdrop_success.png";
import { ExternalLink, Typography } from "~/components/atoms";
import { ShareOnSocials, TokenAmountCard } from "~/components/molecules";

export type Airdrop1ClaimSucessModalContentProps = {
  claimedTokenAmount?: number;
  transactionExplorerUrl?: string;
} & Omit<React.ComponentProps<"div">, "children">;

export const Airdrop1ClaimSucessModalContent: React.FC<
  Airdrop1ClaimSucessModalContentProps
> = (props) => {
  const { transactionExplorerUrl, claimedTokenAmount, ...divProps } = props;

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "Airdrop1ClaimSucessModalContent.title",
    defaultMessage: "Congratulations!",
    description: "Title in the content of the Airdrop 1 claim success modal",
  });

  const subtitle = i18n.formatMessage({
    id: "Airdrop1ClaimSucessModalContent.subtitle",
    defaultMessage: "You have successfully claimed your Verida Airdrop 1",
    description: "Subtitle in the content of the Airdrop 1 claim success modal",
  });

  const transactionExplorerLinkLabel = i18n.formatMessage({
    id: "Airdrop1ClaimSucessModalContent.transactionExplorerLinkLabel",
    defaultMessage: "Check the transaction",
    description:
      "Message to view the transaction on Etherscan in the content of the Airdrop 1 claim success modal",
  });

  const claimedAmountLabel = i18n.formatMessage({
    id: "Airdrop1ClaimSucessModalContent.claimedAmountLabel",
    defaultMessage: "Claimed VDA",
    description:
      "Label for the claimed amount in the content of the Airdrop 1 claim success modal",
  });

  const shareOnSocialsMessage = i18n.formatMessage({
    id: "Airdrop1ClaimSucessModalContent.shareOnSocialsMessage",
    defaultMessage: "Share your airdrop with the community",
    description:
      "Message to share the success on socials in the content of the Airdrop 1 claim success modal",
  });

  const sharedMessageOnSocialsText = i18n.formatMessage({
    id: "Airdrop1ClaimSucessModalContent.sharedMessageOnSocialsText",
    description: "Message shared on social after submitted the proof",
    defaultMessage:
      "I have successfully registered for @verida_io Airdrop 1 at https://missions.verida.network/",
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
        <TokenAmountCard
          amount={claimedTokenAmount}
          title={claimedAmountLabel}
          className="w-full"
        />
        <Typography variant="base">{shareOnSocialsMessage}</Typography>
        <ShareOnSocials sharedMessage={sharedMessageOnSocialsText} />
      </div>
    </div>
  );
};
