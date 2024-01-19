import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Button, Icon, Input, Typography } from "~/components/atoms";
import { Alert } from "~/components/molecules";
import { Modal } from "~/components/templates";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { useRewards } from "~/features/rewards";

export const RewardsModal: React.FunctionComponent = () => {
  const { userXpPoints } = useActivity();
  const {
    isModalOpen,
    closeModal,
    isClaimExists,
    isCheckingClaimExists,
    submitClaim,
    isSubmittingClaim,
  } = useRewards();

  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    setErrorMessage(null);
    closeModal();
  }, [closeModal]);

  const handleSubmit = useCallback(() => {
    const execute = async () => {
      const result = await submitClaim(address);
      if (result.status === "error") {
        setErrorMessage(result.message || null);
      } else {
        setErrorMessage(null);
      }
      setAddress("");
    };
    void execute();
  }, [submitClaim, address]);

  const hasEnoughPoints = userXpPoints >= config.claim.minPoints;

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage({
    id: "RewardsModal.modalTitle",
    defaultMessage: "Submit your wallet address",
    description: "Title for the rewards modal",
  });

  const submitWalletButtonLabel = i18n.formatMessage({
    id: "RewardsModal.submitWalletButtonLabel",
    defaultMessage: "Submit",
    description: "Label for the submit wallet button in the rewards modal",
  });

  const claimAlreadyExistsMessage = i18n.formatMessage({
    id: "RewardsModal.claimAlreadyExistsMessage",
    defaultMessage: "Congratulation! You already provided your wallet address.",
    description:
      "Message displayed in the rewards modal when the claim has already been submitted",
  });

  const submitWalletMessage = i18n.formatMessage({
    id: "RewardsModal.submitWalletMessage",
    defaultMessage:
      "Provide a Polygon blockchain address to receive your rewards.",
    description:
      "Message displayed in the rewards modal when before submitting the claim",
  });

  const notEnoughPointsMessage = i18n.formatMessage(
    {
      id: "RewardsModal.notEnoughPointsMessage",
      defaultMessage:
        "You do not have enough XP points to submit your wallet address. Complete some activities to reach at least {minPoints} XP points and try again.",
      description:
        "Message displayed in the rewards modal when the user doesn't have enough XP points",
    },
    {
      minPoints: config.claim.minPoints,
    }
  );

  return (
    <Modal open={isModalOpen} onClose={handleClose} title={modalTitle}>
      {isClaimExists ? (
        <div>
          <Typography variant="base">{claimAlreadyExistsMessage}</Typography>
        </div>
      ) : (
        <>
          {hasEnoughPoints ? (
            <div className="flex flex-col gap-4">
              <Typography variant="base">{submitWalletMessage}</Typography>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
                <div className="flex-grow">
                  <Input
                    placeholder="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
                    value={address}
                    onChange={(e) => {
                      e.preventDefault();
                      setAddress(e.target.value);
                    }}
                    disabled={
                      !hasEnoughPoints ||
                      isClaimExists ||
                      isCheckingClaimExists ||
                      isSubmittingClaim
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={
                    !hasEnoughPoints ||
                    isClaimExists ||
                    isCheckingClaimExists ||
                    isSubmittingClaim
                  }
                >
                  {isCheckingClaimExists || isSubmittingClaim ? (
                    <>
                      <Icon
                        size={20}
                        type="loading"
                        className="animate-spin-slow"
                      />
                      {submitWalletButtonLabel}
                    </>
                  ) : (
                    <>{submitWalletButtonLabel}</>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Typography variant="base">{notEnoughPointsMessage}</Typography>
            </div>
          )}
          {errorMessage ? (
            <Alert type="error" message={errorMessage} className="mt-4" />
          ) : null}
        </>
      )}
    </Modal>
  );
};
