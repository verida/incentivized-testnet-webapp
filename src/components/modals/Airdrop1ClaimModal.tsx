import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Icon, Typography } from "~/components/atoms";
import { Alert, ShareOnSocials } from "~/components/molecules";
import { Modal } from "~/components/templates";
import {
  AIRDROPS_TERMS_URL,
  AIRDROP_1_DEFINITION,
  useAirdrop1,
} from "~/features/airdrops";

export type Airdrop1ClaimModalProps = {
  onClose: () => void;
};

export const Airdrop1ClaimModal: React.FC<Airdrop1ClaimModalProps> = (
  props
) => {
  const { onClose } = props;

  const { isGettingUserStatus, userStatus, isClaiming, claim } = useAirdrop1();

  const [claimError, setClaimError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleClose = useCallback(() => {
    setClaimError(null);
    setIsTermsAccepted(false);
    onClose();
  }, [onClose]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const execute = async () => {
      setClaimError(null);
      const result = await claim({
        termsAccepted: isTermsAccepted,
        userEvmAddress: "", // TODO: To be implemented
        userEvmAddressSignature: "", // TODO: To be implemented
      });
      if (result.status === "error") {
        setClaimError(result.errorUserMessage || "Something went wrong"); // Not ideal as not localised but enough for now
      } else {
        setClaimError(null);
      }
    };
    void execute();
  }, [isTermsAccepted, claim]);

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(AIRDROP_1_DEFINITION.title);

  const checkingStatusMessage = i18n.formatMessage({
    id: "Airdrop1ClaimModal.checkingStatusMessage",
    defaultMessage: "Checking your registration...",
    description:
      "Message displayed in the airdrop 1 claim modal when checking if the user is registered or not",
  });

  const notRegisteredMessage = i18n.formatMessage(
    {
      id: "Airdrop1ClaimModal.notRegisteredMessage",
      defaultMessage:
        "Unfortunately you are not elligible for the {airdropTitle}",
      description:
        "Message displayed in the airdrop 1 claim modal when the user is not registered",
    },
    {
      airdropTitle: i18n.formatMessage(AIRDROP_1_DEFINITION.title),
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const alreadyClaimedMessage = i18n.formatMessage(
    {
      id: "Airdrop1ClaimModal.alreadyClaimedMessage",
      defaultMessage: "Congratulations! You already claimed the {airdropTitle}",
      description:
        "Message displayed in the airdrop 1 claim modal when the user has already claimed the airdrop",
    },
    {
      airdropTitle: i18n.formatMessage(AIRDROP_1_DEFINITION.title),
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const sharedMessageOnSocialsText = i18n.formatMessage({
    id: "Airdrop1ClaimModal.sharedMessageOnSocialsText",
    description: "Message shared on social after claiming the airdrop",
    defaultMessage:
      "I have successfully claim my @verida_io Airdrop 1 at https://missions.verida.network/airdrops",
  });

  const acceptTermsMessage = i18n.formatMessage({
    id: "Airdrop1ClaimModal.acceptTermsMessage",
    defaultMessage: "Please read and accept the",
    description:
      "Message displayed in the airdrop 1 modal when asking the user to accept the terms and conditions of the airdrop.",
  });

  const termsUrlLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.termsUrlLabel",
    defaultMessage: "Terms and Conditions",
    description:
      "Label of the Airdrops Terms and Conditions link displayed in the airdrop 1 claim modal.",
  });

  const acceptTermsButtonLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.acceptTermsButtonLabel",
    defaultMessage: "Accept",
    description:
      "Label for the button to accept the terms and conditions in the airdrop 1 claim modal",
  });

  const claimMessage = i18n.formatMessage(
    {
      id: "Airdrop1ClaimModal.claimMessage",
      defaultMessage: "Claim",
      description:
        "Message displayed in the rewards modal when before submitting the claim",
    },
    {
      airdropTitle: i18n.formatMessage(AIRDROP_1_DEFINITION.title),
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const submitButtonLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.submitButtonLabel",
    defaultMessage: "Claim",
    description: "Label for the submit button in the airdrop 1 claim modal",
  });

  const claimErrorMessage = i18n.formatMessage(
    {
      id: "Airdrop1ClaimModal.claimErrorMessage",
      defaultMessage:
        "Unfortunately, an error happened while claiming the airdrop. Please try again later.",
      description:
        "Message displayed in the airdrop 1 modal when the claim fails",
    },
    {
      airdropTitle: i18n.formatMessage(AIRDROP_1_DEFINITION.title),
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  return (
    <Modal
      open
      onClose={handleClose}
      title={modalTitle}
      actions={
        isGettingUserStatus
          ? []
          : !userStatus?.isRegistered || userStatus?.isClaimed
            ? []
            : !isTermsAccepted
              ? [
                  {
                    label: acceptTermsButtonLabel,
                    onClick: handleAcceptTerms,
                    variant: "contained",
                    color: "primary",
                  },
                ]
              : claimError
                ? []
                : [
                    {
                      label: submitButtonLabel,
                      onClick: handleSubmit,
                      variant: "contained",
                      color: "primary",
                      disabled: isClaiming,
                    },
                  ]
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {isGettingUserStatus || isClaiming ? (
            <Icon type="loading" size={40} className="animate-spin-slow" />
          ) : !userStatus?.isRegistered ? (
            <Icon type="notification-error" size={40} className="text-error" />
          ) : userStatus?.isClaimed ? (
            <Icon type="check" size={40} className="text-success" />
          ) : !isTermsAccepted ? (
            <Icon type="agreement" size={40} />
          ) : claimError ? (
            <Icon type="notification-error" size={40} className="text-error" />
          ) : null}
          <Typography variant="base">
            {isGettingUserStatus ? (
              checkingStatusMessage
            ) : !userStatus?.isRegistered ? (
              notRegisteredMessage
            ) : userStatus?.isClaimed ? (
              alreadyClaimedMessage
            ) : !isTermsAccepted ? (
              <>
                {acceptTermsMessage}{" "}
                <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
                  {termsUrlLabel}
                </ExternalLink>
              </>
            ) : claimError ? (
              claimErrorMessage
            ) : (
              claimMessage
            )}
          </Typography>
        </div>
        {claimError ? (
          <Alert type="error" message={claimError} className="mt-4" />
        ) : null}
        {!isGettingUserStatus && userStatus?.isClaimed ? (
          <ShareOnSocials
            sharedMessage={sharedMessageOnSocialsText}
            className="flex flex-col sm:flex-row justify-end"
          />
        ) : null}
      </div>
    </Modal>
  );
};
