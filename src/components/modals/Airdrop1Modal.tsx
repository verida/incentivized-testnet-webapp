import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { Alert } from "~/components/molecules";
import { Modal } from "~/components/templates";
import { useActivity } from "~/features/activity";
import { AIRDROP_1_MIN_XP_POINTS, useAirdrops } from "~/features/airdrops";

export const Airdrop1Modal: React.FunctionComponent = () => {
  const { userXpPoints } = useActivity();
  const {
    isAirdrop1ModalOpen,
    closeAirdrop1Modal,
    isCheckingAirdrop1ProofSubmitted,
    isAirdrop1ProofSubmitted,
    isAidrop1Enabled,
    isSubmittingAirdrop1Proof,
    submitAirdrop1Proof,
  } = useAirdrops();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleClose = useCallback(() => {
    setErrorMessage(null);
    closeAirdrop1Modal();
  }, [closeAirdrop1Modal]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const execute = async () => {
      const result = await submitAirdrop1Proof(isTermsAccepted);
      if (result.status === "error") {
        setErrorMessage(result.errorUserMessage || null);
      } else {
        setErrorMessage(null);
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
    defaultMessage: "Checking proof of early adopter...",
    description:
      "Message displayed in the airdrop 1 modal when checking if the proof has already been submitted",
  });

  const proofAlreadySubmittedMessage = i18n.formatMessage({
    id: "Airdrop1Modal.proofAlreadySubmittedMessage",
    defaultMessage:
      "Congratulations! You already submitted your proof of early adopter.",
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

  return (
    <Modal
      open={isAidrop1Enabled && isAirdrop1ModalOpen}
      onClose={handleClose}
      title={modalTitle}
      actions={
        !isTermsAccepted
          ? [
              {
                label: acceptTermsButtonLabel,
                onClick: handleAcceptTerms,
              },
            ]
          : [
              {
                label: submitButtonLabel,
                onClick: handleSubmit,
                variant: "contained",
                disabled:
                  isCheckingAirdrop1ProofSubmitted || isSubmittingAirdrop1Proof,
              },
            ]
      }
    >
      <div className="flex flex-col gap-4">
        <div>
          <Typography variant="base">
            {isCheckingAirdrop1ProofSubmitted
              ? checkingSubmittedProofMessage
              : isAirdrop1ProofSubmitted
                ? proofAlreadySubmittedMessage
                : !hasEnoughPoints
                  ? notEnoughPointsMessage
                  : !isTermsAccepted
                    ? acceptTermsMessage
                    : submitProofMessage}
          </Typography>
        </div>
        {errorMessage ? (
          <Alert type="error" message={errorMessage} className="mt-4" />
        ) : null}
      </div>
    </Modal>
  );
};
