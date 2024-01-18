import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Button, Icon, Input, Typography } from "~/components/atoms";
import { Modal } from "~/components/templates";
import { useRewards } from "~/features/rewards";

export const RewardsModal: React.FunctionComponent = () => {
  const {
    isModalOpen,
    closeModal,
    isClaimExists,
    isCheckingClaimExists,
    submitClaim,
    isSubmittingClaim,
  } = useRewards();

  const [address, setAddress] = useState("");

  const handleSubmit = useCallback(() => {
    void submitClaim(address);
  }, [submitClaim, address]);

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

  return (
    <Modal open={isModalOpen} onClose={closeModal} title={modalTitle}>
      {isClaimExists ? (
        <div>
          <Typography variant="base">{claimAlreadyExistsMessage}</Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Typography variant="base">{submitWalletMessage}</Typography>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            <div className="flex-grow">
              <Input
                placeholder="0xQwerty1234567890..."
                value={address}
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                disabled={
                  isClaimExists || isCheckingClaimExists || isSubmittingClaim
                }
              />
            </div>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={
                isClaimExists || isCheckingClaimExists || isSubmittingClaim
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
      )}
    </Modal>
  );
};
