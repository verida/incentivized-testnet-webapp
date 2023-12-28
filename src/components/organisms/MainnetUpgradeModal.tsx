/* eslint-disable formatjs/no-literal-string-in-jsx */
import { EnvironmentType } from "@verida/types";
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Typography } from "~/components/atoms";
import { Modal } from "~/components/molecules";
import { config } from "~/config";
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
    if (
      config.verida.environment !== EnvironmentType.MAINNET ||
      (hideModal && hideModal === "true")
    ) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const modalTitle = i18n.formatMessage({
    id: "MainnetUpgradeModal.modalTitle",
    defaultMessage: "Verida Missions has launched on Mainnet",
    description: "Title for the mainnet upgrade modal",
  });

  const contentMessage = i18n.formatMessage(
    {
      id: "MainnetUpgradeModal.contentMessage",
      defaultMessage: `Verida Missions is now using the Verida Mainnet.{newline}{newline}If you already participated in Verida Missions, update your Verida Wallet to migrate your Verida Identity to Mainnet. Your completed activities and XP points will be transferred over to Verida Missions as part of the migration.{newline}{newline}Reconnect to Missions after migrating your identity to see your completed activities and continue earning XP.`,
      description: "New to mission paragraphe for the mainnet upgrade modal",
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
    defaultMessage: "Start Exploring",
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
          color: "primary",
        },
      ]}
    >
      <Typography>{contentMessage}</Typography>
      <div className="mt-6 flex flex-col">
        <ExternalLink href="https://news.verida.io/verida-mainnet-is-launching-soon-e3b6cb95408c">
          Read our blog announcement
        </ExternalLink>
        <ExternalLink href="https://community.verida.io/network-faq#c297834af96b4bde946832e5660ce164">
          Learn more in our Missions FAQs
        </ExternalLink>
      </div>
    </Modal>
  );
};
