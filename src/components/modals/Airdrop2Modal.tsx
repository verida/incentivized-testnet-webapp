import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Icon, Input, Typography } from "~/components/atoms";
import { Alert, ShareOnSocials } from "~/components/molecules";
import { Modal } from "~/components/templates";
import {
  AIRDROPS_TERMS_URL,
  AIRDROP_2_DEFINITION,
  useAirdrop2,
} from "~/features/airdrops";

export type Airdrop2ModalProps = {
  onClose: () => void;
};

export const Airdrop2Modal: React.FC<Airdrop2ModalProps> = (props) => {
  const { onClose } = props;

  const { checkEligbility, isChecking } = useAirdrop2();

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
    onClose();
  }, [onClose]);

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(AIRDROP_2_DEFINITION.title);

  const checkYourEligibilityMessage = i18n.formatMessage(
    {
      id: "Airdrop2Modal.checkYourEligibilityMessage",
      defaultMessage:
        "Check if your blockchain wallet address used for the Galxe and Zealy campaigns is included in the {airdropTitle}*{newline}{newline}*This does not guarantee your eligibility to claim airdrop rewards. All Verida Airdrops will be subject to the Airdrop",
      description: "Welcome message in the airdrop 2 modal",
    },
    {
      airdropTitle: i18n.formatMessage(AIRDROP_2_DEFINITION.title),
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const termsUrlLabel = i18n.formatMessage({
    id: "Airdrop2Modal.termsUrlLabel",
    defaultMessage: "Terms and Conditions",
    description: "Label of the Airdrops Terms and Conditions link.",
  });

  const checkingEligibilityMessage = i18n.formatMessage({
    id: "Airdrop2Modal.checkingEligibilityMessage",
    defaultMessage: "Checking...",
    description:
      "Message displayed in the airdrop 2 modal when checking if included in the list",
  });

  const succesfullyEligibleMessage = i18n.formatMessage(
    {
      id: "Airdrop2Modal.succesfullyEligibleMessage",
      defaultMessage:
        "Congratulations! You are included in the {airdropTitle}*.{newline}{newline}Check our socials to be notified when the claim window opens.{newline}{newline}*This does not guarantee your eligibility to claim airdrop rewards. All Verida Airdrops will be subject to the Airdrop",
      description:
        "Message displayed in the airdrop 2 modal when the user is included",
    },
    {
      airdropTitle: i18n.formatMessage(AIRDROP_2_DEFINITION.title),
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const sharedMessageOnSocialsText = i18n.formatMessage({
    id: "Airdrop2Modal.sharedMessageOnSocialsText",
    defaultMessage:
      "I am included in the @verida_io Airdrop 2 at https://missions.verida.network/",
    description: "Message shared on social if eligible to airdrop 2",
  });

  const notEligibleMessage = i18n.formatMessage(
    {
      id: "Airdrop2Modal.notEligibleMessage",
      defaultMessage:
        "Unfortunately, you are not included in the {airdropTitle}{newline}{newline}Read the criteria in the",
      description:
        "Message displayed in the airdrop 2 modal when the user is not included",
    },
    {
      airdropTitle: i18n.formatMessage(AIRDROP_2_DEFINITION.title),
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const announcementArticleUrlLabel = i18n.formatMessage({
    id: "Airdrop2Modal.announcementArticleUrlLabel",
    defaultMessage: "announcement article",
    description: "Label of the Airdrop 2 announcement article link.",
  });

  const checkEligibilityButtonLabel = i18n.formatMessage({
    id: "Airdrop2Modal.checkEligibilityButtonLabel",
    defaultMessage: "Check",
    description:
      "Button label to check a user is included in the airdrop 2 modal",
  });

  const somethingWentWrongMessage = i18n.formatMessage({
    id: "Airdrop2Modal.somethingWentWrongMessage",
    defaultMessage: "Something went wrong. Please try again later.",
    description:
      "Message displayed in the airdrop 2 modal when something went wrong",
  });

  return (
    <Modal
      open
      onClose={handleClose}
      title={modalTitle}
      actions={
        eligilibilityStatus === "unknown" || eligilibilityStatus === "error"
          ? [
              {
                label: checkEligibilityButtonLabel,
                onClick: handleCheckEligibility,
                variant: "contained",
                color: "secondary",
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
            {isChecking ? (
              checkingEligibilityMessage
            ) : eligilibilityStatus === "unknown" ||
              eligilibilityStatus === "error" ? (
              <>
                {checkYourEligibilityMessage}{" "}
                <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
                  {termsUrlLabel}
                </ExternalLink>
              </>
            ) : eligilibilityStatus === "eligible" ? (
              <>
                {succesfullyEligibleMessage}{" "}
                <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
                  {termsUrlLabel}
                </ExternalLink>
              </>
            ) : (
              <>
                {notEligibleMessage}{" "}
                <ExternalLink
                  href={AIRDROP_2_DEFINITION.resource.url}
                  openInNewTab
                >
                  {announcementArticleUrlLabel}
                </ExternalLink>
              </>
            )}
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
