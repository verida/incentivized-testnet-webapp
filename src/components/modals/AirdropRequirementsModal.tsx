import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";

import { ExternalLink, Typography } from "~/components/atoms";
import { Modal } from "~/components/templates";
import { AIRDROPS_TERMS_URL } from "~/features/airdrops";

export type AirdropRequirementsModalProps = {
  open: boolean;
  onClose: () => void;
  airdropTitle: string;
  requirementsMessage: MessageDescriptor;
};

export const AirdropRequirementsModal: React.FC<
  AirdropRequirementsModalProps
> = (props) => {
  const { airdropTitle, open, onClose, requirementsMessage } = props;

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "AirdropRequirementsModal.title",
    defaultMessage: "Airdrop Requirements",
    description: "Title of the airdrop requirements modal",
  });

  const airdropRequirementSectionMessage = i18n.formatMessage(
    {
      id: "AirdropRequirementsModal.airdropRequirementSectionMessage",
      description: "Message displayed above the requirements for the airdrop",
      defaultMessage: "For {airdropTitle}",
    },
    {
      airdropTitle,
    }
  );

  const requirementsContent = i18n.formatMessage(requirementsMessage, {
    newline: (
      <>
        <br />
      </>
    ),
  });

  const termsConditionsRequirement = i18n.formatMessage({
    id: "AirdropRequirementsModal.termsConditionsMessage",
    defaultMessage: "- Additional requirements defined in the airdrops ",
    description: "Label for the terms and conditions",
  });

  const termsConditionsLinkLabel = i18n.formatMessage({
    id: "AirdropRequirementsModal.termsConditionsLinkLabel",
    defaultMessage: "Terms and Conditions",
    description: "Label for the terms and conditions link",
  });

  const closeButtonLabel = i18n.formatMessage({
    id: "AirdropRequirementsModal.closeButtonLabel",
    defaultMessage: "Got It",
    description: "Label for the close button of the airdrop requirements modal",
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      actions={[
        {
          label: closeButtonLabel,
          onClick: onClose,
          variant: "contained",
          color: "primary",
        },
      ]}
    >
      <div className="bg-transparent-15 p-3 rounded-xl flex flex-col gap-4">
        <Typography>{airdropRequirementSectionMessage}</Typography>
        <Typography>{requirementsContent}</Typography>
        <Typography>
          <>
            {termsConditionsRequirement}{" "}
            <ExternalLink href={AIRDROPS_TERMS_URL} openInNewTab>
              {termsConditionsLinkLabel}
            </ExternalLink>
          </>
        </Typography>
      </div>
    </Modal>
  );
};
