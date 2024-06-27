import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Icon, Typography } from "~/components/atoms";
import { Alert, ShareOnSocials } from "~/components/molecules";
import { Modal } from "~/components/templates";
import { useActivity } from "~/features/activity";
import {
  AIRDROPS_TERMS_URL,
  AIRDROP_1_DEFINITION,
  AIRDROP_1_MIN_XP_POINTS,
  useAirdrop1,
} from "~/features/airdrops";

export type Airdrop1RegistrationModalProps = {
  onClose: () => void;
};

export const Airdrop1RegistrationModal: React.FC<
  Airdrop1RegistrationModalProps
> = (props) => {
  const { onClose } = props;

  const { userXpPoints, isLoadingUserActivities } = useActivity();
  const {
    isCheckingProofSubmitted,
    isProofSubmitted,
    isSubmittingProof,
    submitProof,
  } = useAirdrop1();

  const [hasProofSubmitError, setHasProofSubmitError] = useState(false);
  const [proofSubmitError, setProofSubmitError] = useState<string | null>(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleClose = useCallback(() => {
    setHasProofSubmitError(false);
    setProofSubmitError(null);
    setIsTermsAccepted(false);
    onClose();
  }, [onClose]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const execute = async () => {
      setHasProofSubmitError(false);
      const result = await submitProof(isTermsAccepted);
      if (result.status === "error") {
        setHasProofSubmitError(true);
        setProofSubmitError(result.errorUserMessage || null); // Not ideal as not localised but enough for now
      } else {
        setHasProofSubmitError(false);
        setProofSubmitError(null);
      }
    };
    void execute();
  }, [isTermsAccepted, submitProof]);

  const hasEnoughPoints = userXpPoints >= AIRDROP_1_MIN_XP_POINTS;

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(AIRDROP_1_DEFINITION.title);

  const checkingSubmittedProofMessage = i18n.formatMessage({
    id: "Airdrop1RegistrationModal.checkingSubmittedProofMessage",
    defaultMessage: "Checking existing registration...",
    description:
      "Message displayed in the airdrop 1 modal when checking if the proof has already been submitted",
  });

  const proofAlreadySubmittedMessage = i18n.formatMessage(
    {
      id: "Airdrop1RegistrationModal.proofAlreadySubmittedMessage",
      defaultMessage:
        "Congratulations! You are registered for the {airdropTitle}.{newline}{newline}Check our socials to be notified when the claim window opens.{newline}{newline}Note that the claim process will also be subject to the",
      description:
        "Message displayed in the airdrop 1 modal when the proof has already been submitted",
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
    id: "Airdrop1RegistrationModal.sharedMessageOnSocialsText",
    description: "Message shared on social after submitted the proof",
    defaultMessage:
      "I have successfully registered for @verida_io Airdrop 1 at https://missions.verida.network/",
  });

  const notEnoughPointsMessage = i18n.formatMessage(
    {
      id: "Airdrop1RegistrationModal.notEnoughPointsMessage",
      defaultMessage:
        "You do not have enough XP points to register for this airdrop.{newline}{newline}Complete some activities to reach at least {minPoints} XP points and try again.",
      description:
        "Message displayed in the airdrop 1 modal when the user doesn't have enough XP points",
    },
    {
      minPoints: AIRDROP_1_MIN_XP_POINTS,
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const acceptTermsMessage = i18n.formatMessage({
    id: "Airdrop1RegistrationModal.acceptTermsMessage",
    defaultMessage: "Please read and accept the",
    description:
      "Message displayed in the airdrop 1 modal when asking the user to accept the terms and conditions of the airdrop.",
  });

  const termsUrlLabel = i18n.formatMessage({
    id: "Airdrop1RegistrationModal.termsUrlLabel",
    defaultMessage: "Terms and Conditions",
    description:
      "Label of the Airdrops Terms and Conditions link displayed in the airdrop 1 modal.",
  });

  const acceptTermsButtonLabel = i18n.formatMessage({
    id: "Airdrop1RegistrationModal.acceptTermsButtonLabel",
    defaultMessage: "Accept",
    description:
      "Label for the button to accept the terms and conditions in the airdrop 1 modal",
  });

  const submitProofMessage = i18n.formatMessage(
    {
      id: "Airdrop1RegistrationModal.submitProofMessage",
      defaultMessage:
        "As a decentralised application, Verida Missions needs to verify that your completed activities meet the {airdropTitle} criteria.{newline}{newline}Please submit your XP points proofs to our server for verification.",
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
    id: "Airdrop1RegistrationModal.submitButtonLabel",
    defaultMessage: "Submit Proofs",
    description: "Label for the submit button in the airdrop 1 modal",
  });

  const proofSubmitErrorMessage = i18n.formatMessage(
    {
      id: "Airdrop1RegistrationModal.proofSubmitErrorMessage",
      defaultMessage:
        "Unfortunately, you are not eligible for the {airdropTitle}.{newline}To confirm the criteria, please check the",
      description:
        "Message displayed in the airdrop 1 modal when the proof submission fails",
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
      alignBottomOnMobile
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
                      variant: "contained",
                      color: "secondary",
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
              <>
                {proofAlreadySubmittedMessage}{" "}
                <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
                  {termsUrlLabel}
                </ExternalLink>
              </>
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
