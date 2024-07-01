import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";

import { Typography } from "~/components/atoms";
import { Airdrop1RegistrationModal } from "~/components/modals/Airdrop1RegistrationModal";
import { Airdrop2CheckModal } from "~/components/modals/Airdrop2CheckModal";
import { ConnectVeridaButton } from "~/components/organisms";
import { Modal } from "~/components/templates";
import {
  AIRDROP_1_DEFINITION,
  AIRDROP_2_DEFINITION,
} from "~/features/airdrops";
import { useVerida } from "~/features/verida";

export const AirdropModal: React.FC = () => {
  const { airdropId } = useParams();

  const { isConnected, isConnecting } = useVerida();

  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate("/airdrops");
  }, [navigate]);

  const i18n = useIntl();

  const notConnectedModalTitle = i18n.formatMessage({
    id: "AirdropModal.notConnectedModalTitle",
    description: "Title of the modal when the user is not connected",
    defaultMessage: "Connect your Verida identity",
  });

  const notConnectedModalMessage = i18n.formatMessage({
    id: "AirdropModal.notConnectedModalMessage",
    description: "Message of the modal when the user is not connected",
    defaultMessage:
      "To proceed with the airdrop, you need to connect your Verida identity.",
  });

  if (!isConnected && !isConnecting) {
    return (
      <Modal open onClose={handleClose} title={notConnectedModalTitle}>
        <div className="flex flex-col gap-8">
          <Typography>{notConnectedModalMessage}</Typography>
          <ConnectVeridaButton longLabel />
        </div>
      </Modal>
    );
  }

  if (
    airdropId === AIRDROP_1_DEFINITION.id &&
    AIRDROP_1_DEFINITION.status === "registration-opened"
  ) {
    return <Airdrop1RegistrationModal onClose={handleClose} />;
  }

  if (
    airdropId === AIRDROP_2_DEFINITION.id &&
    AIRDROP_2_DEFINITION.status === "check"
  ) {
    return <Airdrop2CheckModal onClose={handleClose} />;
  }

  return null;
};
