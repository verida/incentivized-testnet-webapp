import React from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Typography } from "~/components/atoms";
import { Modal } from "~/components/templates";
import {
  VERIDA_MISSIONS_FAQ_URL,
  VERIDA_MISSIONS_TESTNET_URL,
} from "~/constants";
import { useMainnetUpgrade } from "~/features/mainnetUpgrade";

export const MainnetUpgradeModal: React.FunctionComponent = () => {
  const { acknowledgeUpgrade, isModalOpen } = useMainnetUpgrade();

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage({
    id: "MainnetUpgradeModal.modalTitle",
    defaultMessage: "Verida Missions has launched on Mainnet",
    description: "Title for the mainnet upgrade modal",
  });

  const existingUserTitle = i18n.formatMessage({
    id: "MainnetUpgradeModal.existingUserTitle",
    defaultMessage: "Testnet users: Make the move to Mainnet!",
    description:
      "Title for existing users paragraph in the mainnet upgrade modal",
  });

  const existingUserMessage = i18n.formatMessage(
    {
      id: "MainnetUpgradeModal.existingUserMessage",
      defaultMessage: `Verida Missions is now using the Verida Mainnet. Update your Verida Wallet to start the process for migrating your Verida Identity to Mainnet, and ensure your completed activities and XP points are transferred.`,
      description: "Message for existing users in the mainnet upgrade modal",
    },
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const faqLinkLabel = i18n.formatMessage({
    id: "MainnetUpgradeModal.faqLinkLabel",
    defaultMessage: "Learn more in the FAQs",
    description: "Label for the faq link in the mainnet upgrade modal",
  });

  const testnetMissionsLinkLabel = i18n.formatMessage({
    id: "MainnetUpgradeModal.testnetMissionsLinkLabel",
    defaultMessage: "Verida Missions on Testnet",
    description:
      "Label for the testnet missions link in the mainnet upgrade modal",
  });

  const closeButtonLabel = i18n.formatMessage({
    id: "MainnetUpgradeModal.closeButtonLabel",
    defaultMessage: "Start Exploring",
    description: "Label for the close button in the mainnet upgrade modal",
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={acknowledgeUpgrade}
      title={modalTitle}
      actions={[
        {
          label: closeButtonLabel,
          onClick: acknowledgeUpgrade,
          variant: "contained",
          color: "primary",
        },
      ]}
    >
      <div className="flex flex-col gap-2">
        <Typography variant="heading-s" component="h3">
          {existingUserTitle}
        </Typography>
        <Typography>{existingUserMessage}</Typography>
      </div>
      <div className="mt-6 flex flex-col">
        <ExternalLink href={VERIDA_MISSIONS_FAQ_URL} openInNewTab>
          {faqLinkLabel}
        </ExternalLink>
        <ExternalLink href={VERIDA_MISSIONS_TESTNET_URL}>
          {testnetMissionsLinkLabel}
        </ExternalLink>
      </div>
    </Modal>
  );
};
