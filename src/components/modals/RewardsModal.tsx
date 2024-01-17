import React from "react";
import { useIntl } from "react-intl";

import { Button, Input, Typography } from "~/components/atoms";
import { Modal } from "~/components/templates";
import { useRewards } from "~/features/rewards";

export const RewardsModal: React.FunctionComponent = () => {
  const { isModalOpen, closeModal, isClaimExists, submitClaim } = useRewards();

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage({
    id: "RewardsModal.modalTitle",
    defaultMessage: "Claim your rewards",
    description: "Title for the rewards modal",
  });

  const closeButtonLabel = i18n.formatMessage({
    id: "RewardsModal.closeButtonLabel",
    defaultMessage: "Close",
    description: "Label for the close button in the rewards modal",
  });

  const submitWalletButtonLabel = i18n.formatMessage({
    id: "RewardsModal.submitWalletButtonLabel",
    defaultMessage: "Submit",
    description: "Label for the submit wallet button in the rewards modal",
  });

  const claimAlreadyExists = i18n.formatMessage({
    id: "RewardsModal.claimAlreadyExists",
    defaultMessage: "Claim already exists",
    description: "",
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      title={modalTitle}
      actions={[
        {
          label: closeButtonLabel,
          onClick: closeModal,
          variant: "text",
          color: "primary",
        },
      ]}
    >
      {isClaimExists ? (
        <div>
          <Typography variant="base">{claimAlreadyExists}</Typography>
        </div>
      ) : null}
      <div className="flex flex-row gap-2">
        <div className="flex-grow">
          <Input />
        </div>
        <Button variant="contained" onClick={() => void submitClaim("0x")}>
          {submitWalletButtonLabel}
        </Button>
      </div>
    </Modal>
  );
};
