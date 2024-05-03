import React from "react";
import { useIntl } from "react-intl";

import { Icon, Typography } from "~/components/atoms";
import { Modal } from "~/components/templates";
import { useAirdrop2, useAirdrop2Queries } from "~/features/airdrops";

export const Airdrop2Modal: React.FunctionComponent = () => {
  const { metadata, isEnabled, isModalOpen, closeModal } = useAirdrop2();
  const { isEligible, isCheckingEligibility } = useAirdrop2Queries();

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(metadata.longTitle);

  const checkingEligibilityMessage = i18n.formatMessage({
    id: "Airdrop2Modal.checkingEligibilityMessage",
    defaultMessage: "Checking your eligibility to the airdrop...",
    description:
      "Message displayed in the airdrop 2 modal when checking if eligible",
  });

  const succesfullyEligibleMessage = i18n.formatMessage(
    {
      id: "Airdrop2Modal.succesfullyEligibleMessage",
      defaultMessage:
        "Congratulations! You are eligible for the Galxe and Zealy participants Airdrop.{newline}{newline}Check our socials to be notified when the claim window opens.",
      description:
        "Message displayed in the airdrop 2 modal when the user is eligible",
    },
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const notEligibleMessage = i18n.formatMessage({
    id: "Airdrop2Modal.notEligibleMessage",
    defaultMessage:
      "Unfortunately, you are not eligible for the Galxe and Zealy participants Airdrop.",
    description:
      "Message displayed in the airdrop 2 modal when the user is not eligible",
  });

  return (
    <Modal
      open={isEnabled && isModalOpen}
      onClose={closeModal}
      title={modalTitle}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {isCheckingEligibility ? (
            <Icon type="loading" size={40} className="animate-spin-slow" />
          ) : isEligible ? (
            <Icon type="check" size={40} className="text-success" />
          ) : (
            <Icon type="notification-error" size={40} className="text-error" />
          )}
          <Typography variant="base">
            {isCheckingEligibility
              ? checkingEligibilityMessage
              : isEligible
                ? succesfullyEligibleMessage
                : notEligibleMessage}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};
