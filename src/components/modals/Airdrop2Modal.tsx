import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { Modal } from "~/components/templates";
import { useAirdrop2 } from "~/features/airdrops";

export const Airdrop2Modal: React.FunctionComponent = () => {
  const { metadata, isEnabled, isModalOpen, closeModal } = useAirdrop2();

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(metadata.longTitle);

  const message = i18n.formatMessage({
    id: "message.message",
    defaultMessage: "Check your eligibility to the Airdrop",
    description: "",
  });

  return (
    <Modal
      open={isEnabled && isModalOpen}
      onClose={closeModal}
      title={modalTitle}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Typography variant="base">{message}</Typography>
        </div>
      </div>
    </Modal>
  );
};
