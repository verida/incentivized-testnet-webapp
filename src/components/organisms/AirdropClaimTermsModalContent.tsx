import React from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Typography } from "~/components/atoms";
import { AIRDROPS_TERMS_URL } from "~/features/airdrops";

export type AirdropClaimTermsModalContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

export const AirdropClaimTermsModalContent: React.FC<
  AirdropClaimTermsModalContentProps
> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const acceptTermsMessage = i18n.formatMessage({
    id: "AirdropClaimTermsModalContent.acceptTermsMessage",
    defaultMessage: "Please read and accept the",
    description:
      "Message displayed in the airdrop modal when asking the user to accept the terms and conditions of the airdrop.",
  });

  const termsUrlLabel = i18n.formatMessage({
    id: "AirdropClaimTermsModalContent.termsUrlLabel",
    defaultMessage: "Terms and Conditions",
    description:
      "Label of the Airdrops Terms and Conditions link displayed in the airdrop claim modal.",
  });

  return (
    <div {...divProps}>
      <Typography variant="base">
        <>
          {acceptTermsMessage}{" "}
          <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
            {termsUrlLabel}
          </ExternalLink>
        </>
      </Typography>
    </div>
  );
};
