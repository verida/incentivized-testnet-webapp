import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Icon, Typography } from "~/components/atoms";
import { Alert, ShareOnSocials } from "~/components/molecules";
import { Modal } from "~/components/templates";
import { useActivity } from "~/features/activity";
import {
  AIRDROPS_TERMS_URL,
  AIRDROP_1_MIN_XP_POINTS,
  useAirdrop1,
  useAirdrop1Queries,
} from "~/features/airdrops";

export const Airdrop1Modal: React.FunctionComponent = () => {
  const { userXpPoints, isLoadingUserActivities } = useActivity();
  const { metadata, closeModal, isEnabled, isModalOpen } = useAirdrop1();
  const {
    isCheckingProofSubmitted,
    isProofSubmitted,
    isSubmittingProof,
    submitProof,
  } = useAirdrop1Queries();

  const [hasProofSubmitError, setHasProofSubmitError] = useState(false);
  const [proofSubmitError, setProofSubmitError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleClose = useCallback(() => {
    setHasProofSubmitError(false);
    setProofSubmitError(null);
    setIsTermsAccepted(false);
    closeModal();
  }, [closeModal]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const execute = async () => {
      setHasProofSubmitError(false);
      const result = await submitProof(isTermsAccepted);
      if (result.status === "error") {
        setHasProofSubmitError(true);
        setProofSubmitError(result.errorUserMessage || null);
      } else {
        setHasProofSubmitError(false);
        setProofSubmitError(null);
      }
    };
    void execute();
  }, [isTermsAccepted, submitProof]);

  const hasEnoughPoints = userXpPoints >= AIRDROP_1_MIN_XP_POINTS;

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(metadata.longTitle);

  const checkingSubmittedProofMessage = i18n.formatMessage({
    id: "Airdrop1Modal.checkingSubmittedProofMessage",
    defaultMessage: "Checking existing proof of early adopter eligibility...",
    description:
      "Message displayed in the airdrop 1 modal when checking if the proof has already been submitted",
  });

  const proofAlreadySubmittedMessage = i18n.formatMessage(
    {
      id: "Airdrop1Modal.proofAlreadySubmittedMessage",
      defaultMessage:
        "Congratulations! You are eligible for the Early Adopters Airdrop and have been registered.{newline}{newline}Check our socials to be notified when the claim window opens.",
      description:
        "Message displayed in the airdrop 1 modal when the proof has already been submitted",
    },
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const sharedMessageOnSocialsText = i18n.formatMessage({
    id: "Airdrop1Modal.sharedMessageOnSocialsText",
    description: "Message shared on social after submitted the proof",
    defaultMessage:
      "I have successfully registered for @verida_io Airdrop 1 at https://missions.verida.network/",
  });

  const notEnoughPointsMessage = i18n.formatMessage(
    {
      id: "Airdrop1Modal.notEnoughPointsMessage",
      defaultMessage:
        "You do not have enough XP points to submit your proof of eligibility. Complete some activities to reach at least {minPoints} XP points and try again.",
      description:
        "Message displayed in the airdrop 1 modal when the user doesn't have enough XP points",
    },
    {
      minPoints: AIRDROP_1_MIN_XP_POINTS,
    }
  );

  const acceptTermsMessage = i18n.formatMessage({
    id: "Airdrop1Modal.acceptTermsMessage",
    defaultMessage: "Please read and accept the",
    description:
      "Message displayed in the airdrop 1 modal when asking the user to accept the terms and conditions of the airdrop.",
  });

  const termsUrlLabel = i18n.formatMessage({
    id: "Airdrop1Modal.termsUrlLabel",
    defaultMessage: "Terms and Conditions",
    description:
      "Label of the Airdrops Terms and Conditions link displayed in the airdrop 1 modal.",
  });

  const acceptTermsButtonLabel = i18n.formatMessage({
    id: "Airdrop1Modal.acceptTermsButtonLabel",
    defaultMessage: "Accept",
    description:
      "Label for the button to accept the terms and conditions in the airdrop 1 modal",
  });

  const submitProofMessage = i18n.formatMessage({
    id: "Airdrop1Modal.submitProofMessage",
    defaultMessage:
      "As a decentralised application, Verida Missions needs to verify your completed activities meet the Early Adopters Airdrop criteria. Please submit your XP points proofs to our server for verification.",
    description:
      "Message displayed in the rewards modal when before submitting the claim",
  });

  const submitButtonLabel = i18n.formatMessage({
    id: "Airdrop1Modal.submitButtonLabel",
    defaultMessage: "Submit Proofs",
    description: "Label for the submit button in the airdrop 1 modal",
  });

  const proofSubmitErrorMessage = i18n.formatMessage({
    id: "Airdrop1Modal.proofSubmitErrorMessage",
    defaultMessage:
      "Unfortunately, you are not eligible for the Early Adopters Airdrop. To confirm the criteria, please check the",
    description:
      "Message displayed in the airdrop 1 modal when the proof submission fails",
  });

  return (
    <Modal
      open={isEnabled && isModalOpen}
      onClose={handleClose}
      title={modalTitle}
      actions={
        isCheckingProofSubmitted || isLoadingUserActivities
          ? []
          : isProofSubmitted
            ? []
            : !hasEnoughPoints
              ? []
              : !isTermsAccepted
                ? [
                    {
                      label: acceptTermsButtonLabel,
                      onClick: handleAcceptTerms,
                    },
                  ]
                : hasProofSubmitError
                  ? []
                  : [
                      {
                        label: submitButtonLabel,
                        onClick: handleSubmit,
                        variant: "contained",
                        color: "primary",
                        disabled: isSubmittingProof,
                      },
                    ]
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {isCheckingProofSubmitted ||
          isLoadingUserActivities ||
          isSubmittingProof ? (
            <Icon type="loading" size={40} className="animate-spin-slow" />
          ) : isProofSubmitted ? (
            <Icon type="check" size={40} className="text-success" />
          ) : !hasEnoughPoints ? (
            <Icon type="notification-error" size={40} className="text-error" />
          ) : !isTermsAccepted ? (
            <Icon type="agreement" size={40} />
          ) : hasProofSubmitError ? (
            <Icon type="notification-error" size={40} className="text-error" />
          ) : null}
          <Typography variant="base">
            {isCheckingProofSubmitted || isLoadingUserActivities ? (
              checkingSubmittedProofMessage
            ) : isProofSubmitted ? (
              proofAlreadySubmittedMessage
            ) : !hasEnoughPoints ? (
              notEnoughPointsMessage
            ) : !isTermsAccepted ? (
              <>
                {acceptTermsMessage}{" "}
                <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
                  {termsUrlLabel}
                </ExternalLink>
              </>
            ) : hasProofSubmitError ? (
              <>
                {proofSubmitErrorMessage}{" "}
                <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
                  {termsUrlLabel}
                </ExternalLink>
              </>
            ) : (
              submitProofMessage
            )}
          </Typography>
        </div>
        {hasProofSubmitError && proofSubmitError ? (
          <Alert type="error" message={proofSubmitError} className="mt-4" />
        ) : null}
        {!isCheckingProofSubmitted &&
        !isLoadingUserActivities &&
        isProofSubmitted ? (
          <ShareOnSocials
            sharedMessage={sharedMessageOnSocialsText}
            className="flex flex-col sm:flex-row justify-end"
          />
        ) : null}
      </div>
    </Modal>
  );
};
