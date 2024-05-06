import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Icon, Input, Typography } from "~/components/atoms";
import { Alert, ShareOnSocials } from "~/components/molecules";
import { Modal } from "~/components/templates";
import { useAirdrop2, useAirdrop2CheckEligibility } from "~/features/airdrops";

export const Airdrop2Modal: React.FunctionComponent = () => {
  const { metadata, isEnabled, isModalOpen, closeModal } = useAirdrop2();
  const { checkEligbility, isChecking } = useAirdrop2CheckEligibility();

  const [walletAddress, setWalletAddress] = useState("");
  const [eligilibilityStatus, setEligibilityStatus] = useState<
    "eligible" | "notEligible" | "error" | "unknown"
  >("unknown");
  const [eligibilityCheckError, setEligibilityCheckError] = useState<
    string | null
  >(null);

  const handleWalletAddressInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setWalletAddress(e.target.value);
      setEligibilityStatus("unknown");
      setEligibilityCheckError(null);
    },
    []
  );

  const handleCheckEligibility = useCallback(() => {
    const execute = async () => {
      const response = await checkEligbility(walletAddress);

      if (response.status === "success") {
        setEligibilityStatus(response.isEligible ? "eligible" : "notEligible");
        setEligibilityCheckError(null);
        return;
      } else {
        setEligibilityStatus("error");
        setEligibilityCheckError(response.errorUserMessage || null); // Not the ideal as not localised but enough for now.
      }
    };

    void execute();
  }, [checkEligbility, walletAddress]);

  const handleClose = useCallback(() => {
    setWalletAddress("");
    setEligibilityStatus("unknown");
    setEligibilityCheckError(null);
    closeModal();
  }, [closeModal]);

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(metadata.longTitle);

  const checkYourEligibilityMessage = i18n.formatMessage({
    id: "Airdrop2Modal.checkYourEligibilityMessage",
    defaultMessage:
      "Check your eligibility for the Galxe and Zealy Participants Airdrop!",
    description: "Welcome message in the airdrop 2 modal",
  });

  const checkingEligibilityMessage = i18n.formatMessage({
    id: "Airdrop2Modal.checkingEligibilityMessage",
    defaultMessage: "Checking your eligibility...",
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

  const sharedMessageOnSocialsText = i18n.formatMessage({
    id: "Airdrop2Modal.sharedMessageOnSocialsText",
    description: "Message shared on social if eligible to airdrop 2",
    defaultMessage:
      "I am eligible for the @verida_io Airdrop 2 at https://missions.verida.network/",
  });

  const notEligibleMessage = i18n.formatMessage({
    id: "Airdrop2Modal.notEligibleMessage",
    defaultMessage:
      "Unfortunately, you are not eligible for the Galxe and Zealy participants Airdrop.",
    description:
      "Message displayed in the airdrop 2 modal when the user is not eligible",
  });

  const checkEligibilityButtonLabel = i18n.formatMessage({
    id: "Airdrop2Modal.checkEligibilityButtonLabel",
    defaultMessage: "Check eligibility",
    description: "Button label to check eligibility in the airdrop 2 modal",
  });

  const somethingWentWrongMessage = i18n.formatMessage({
    id: "Airdrop2Modal.somethingWentWrongMessage",
    defaultMessage: "Something went wrong. Please try again later.",
    description:
      "Message displayed in the airdrop 2 modal when something went wrong",
  });

  return (
    <Modal
      open={isEnabled && isModalOpen}
      onClose={handleClose}
      title={modalTitle}
      actions={
        eligilibilityStatus === "unknown" || eligilibilityStatus === "error"
          ? [
              {
                label: checkEligibilityButtonLabel,
                onClick: handleCheckEligibility,
                disabled: isChecking,
              },
            ]
          : []
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {isChecking ? (
            <Icon type="loading" size={40} className="animate-spin-slow" />
          ) : eligilibilityStatus === "unknown" ||
            eligilibilityStatus === "error" ? null : eligilibilityStatus ===
            "eligible" ? (
            <Icon type="check" size={40} className="text-success" />
          ) : (
            <Icon type="notification-error" size={40} className="text-error" />
          )}
          <Typography variant="base">
            {isChecking
              ? checkingEligibilityMessage
              : eligilibilityStatus === "unknown" ||
                  eligilibilityStatus === "error"
                ? checkYourEligibilityMessage
                : eligilibilityStatus === "eligible"
                  ? succesfullyEligibleMessage
                  : notEligibleMessage}
          </Typography>
        </div>
        {eligilibilityStatus === "eligible" ? (
          <ShareOnSocials
            sharedMessage={sharedMessageOnSocialsText}
            className="flex flex-col sm:flex-row justify-end"
          />
        ) : null}
        {eligilibilityStatus === "unknown" ||
        eligilibilityStatus === "error" ? (
          <Input
            placeholder="0x..."
            value={walletAddress}
            onChange={handleWalletAddressInputChange}
          />
        ) : null}
        {eligilibilityStatus === "error" ? (
          <Alert
            type="error"
            message={eligibilityCheckError || somethingWentWrongMessage}
            className="mt-4"
          />
        ) : null}
      </div>
    </Modal>
  );
};
