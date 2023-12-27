import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { Modal } from "~/components/molecules";
import { MAINNET_UPGRADE_HIDE_MODAL_LOCAL_STORAGE_KEY } from "~/features/mainnetUpgrade";

export const MainnetUpgradeModal: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  const i18n = useIntl();

  const handleClose = useCallback(() => {
    localStorage.setItem(MAINNET_UPGRADE_HIDE_MODAL_LOCAL_STORAGE_KEY, "true");
    setOpen(false);
  }, []);

  useEffect(() => {
    const hideModal = localStorage.getItem(
      MAINNET_UPGRADE_HIDE_MODAL_LOCAL_STORAGE_KEY
    );
    if (hideModal && hideModal === "true") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const modalTitle = i18n.formatMessage({
    id: "MainnetUpgradeModal.modalTitle",
    defaultMessage: "Verida Missions is on Mainnet",
    description: "Title for the mainnet upgrade modal",
  });

  const content = i18n.formatMessage(
    {
      id: "MainnetUpgradeModal.content",
      defaultMessage: `Verida Missions is now using the Verida Mainnet.{newline}{newline}If you were using Verida Missions on Testnet, please update your Verida Wallet and migrate your Testnet identity. Your completed activities and XP points will be migrated to the Mainnet.{newline}{newline}If you have any questions, please join our Discord channel.`,
      description: "Content for the mainnet upgrade modal",
    },
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const closeButtonLabel = i18n.formatMessage({
    id: "MainnetUpgradeModal.closeButtonLabel",
    defaultMessage: "Close",
    description: "Label for the close button in the mainnet upgrade modal",
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={modalTitle}
      actions={[
        {
          label: closeButtonLabel,
          onClick: handleClose,
          variant: "contained",
        },
      ]}
    >
      <Typography>{content}</Typography>
    </Modal>
  );
};
