import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Icon, Typography } from "~/components/atoms";
import { Alert } from "~/components/molecules";
import { Modal } from "~/components/templates";
import { useActivity } from "~/features/activity";
import { AIRDROP_1_MIN_XP_POINTS, useAirdrops } from "~/features/airdrops";

export const Airdrop1Modal: React.FunctionComponent = () => {
  const { userXpPoints, isLoadingUserActivities } = useActivity();
  const {
    isAirdrop1ModalOpen,
    closeAirdrop1Modal,
    isCheckingAirdrop1ProofSubmitted,
    isAirdrop1ProofSubmitted,
    isAidrop1Enabled,
    isSubmittingAirdrop1Proof,
    submitAirdrop1Proof,
  } = useAirdrops();

  const [hasProofSubmitError, setHasProofSubmitError] = useState(false);
  const [proofSubmitError, setProofSubmitError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleClose = useCallback(() => {
    setHasProofSubmitError(false);
    setProofSubmitError(null);
    closeAirdrop1Modal();
  }, [closeAirdrop1Modal]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const execute = async () => {
      setHasProofSubmitError(false);
      const result = await submitAirdrop1Proof(isTermsAccepted);
      if (result.status === "error") {
        setHasProofSubmitError(true);
        setProofSubmitError(result.errorUserMessage || null);
      } else {
        setHasProofSubmitError(false);
        setProofSubmitError(null);
      }
    };
    void execute();
  }, [isTermsAccepted, submitAirdrop1Proof]);

  const hasEnoughPoints = userXpPoints >= AIRDROP_1_MIN_XP_POINTS;

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage({
    id: "Airdrop1Modal.modalTitle",
    defaultMessage: "Early Adopters Airdrop",
    description: "Title for the airdrop 1 modal",
  });

  const checkingSubmittedProofMessage = i18n.formatMessage({
    id: "Airdrop1Modal.checkingSubmittedProofMessage",
    defaultMessage: "Checking existing proof of early adopter eligibility...",
    description:
      "Message displayed in the airdrop 1 modal when checking if the proof has already been submitted",
  });

  const proofAlreadySubmittedMessage = i18n.formatMessage({
    id: "Airdrop1Modal.proofAlreadySubmittedMessage",
    defaultMessage:
      "Congratulations! You submitted your proof of Early Adopter and are eligible for the airdrop.",
    description:
      "Message displayed in the airdrop 1 modal when the proof has already been submitted",
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
    defaultMessage:
      "Please read and accept the terms and conditions of the Early Adopters Airdrop.",
    description:
      "Message displayed in the airdrop 1 modal when asking the user to accept the terms and conditions of the airdrop.",
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
      "As a decentralised application, Verida Missions needs to send a proof of your completed activities to confirm your early adopter eligibility.",
    description:
      "Message displayed in the rewards modal when before submitting the claim",
  });

  const submitButtonLabel = i18n.formatMessage({
    id: "Airdrop1Modal.submitButtonLabel",
    defaultMessage: "Prove",
    description: "Label for the submit button in the airdrop 1 modal",
  });

  const proofSubmitErrorMessage = i18n.formatMessage({
    id: "Airdrop1Modal.proofSubmitErrorMessage",
    defaultMessage:
      "Unfortunately, your proof of Early Adopter has not been accepted.",
    description:
      "Message displayed in the airdrop 1 modal when the proof submission fails",
  });

  const proofSubmitErrorFallbackJustificationMessage = i18n.formatMessage({
    id: "Airdrop1Modal.proofSubmitErrorFallbackJustificationMessage",
    defaultMessage: "Something went wrong on our side",
    description:
      "Message displayed in the airdrop 1 modal when the proof submission fails",
  });

  return (
    <Modal
      open={isAidrop1Enabled && isAirdrop1ModalOpen}
      onClose={handleClose}
      title={modalTitle}
      actions={
        isCheckingAirdrop1ProofSubmitted || isLoadingUserActivities
          ? []
          : isAirdrop1ProofSubmitted
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
                        disabled: isSubmittingAirdrop1Proof,
                      },
                    ]
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {isCheckingAirdrop1ProofSubmitted ||
          isLoadingUserActivities ||
          isSubmittingAirdrop1Proof ? (
            <Icon type="loading" size={40} className="animate-spin-slow" />
          ) : isAirdrop1ProofSubmitted ? (
            <Icon type="check" size={40} className="text-success" />
          ) : !hasEnoughPoints ? (
            <Icon type="notification-error" size={40} className="text-error" />
          ) : !isTermsAccepted ? (
            <Icon type="agreement" size={40} />
          ) : hasProofSubmitError ? (
            <Icon type="notification-error" size={40} className="text-error" />
          ) : null}
          <Typography variant="base">
            {isCheckingAirdrop1ProofSubmitted || isLoadingUserActivities
              ? checkingSubmittedProofMessage
              : isAirdrop1ProofSubmitted
                ? proofAlreadySubmittedMessage
                : !hasEnoughPoints
                  ? notEnoughPointsMessage
                  : !isTermsAccepted
                    ? acceptTermsMessage
                    : hasProofSubmitError
                      ? proofSubmitErrorMessage
                      : submitProofMessage}
          </Typography>
        </div>
        {hasProofSubmitError ? (
          <Alert
            type="error"
            message={
              proofSubmitError || proofSubmitErrorFallbackJustificationMessage
            }
            className="mt-4"
          />
        ) : null}
      </div>
    </Modal>
  );
};
