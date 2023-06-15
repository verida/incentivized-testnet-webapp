import React, { useCallback } from "react";
import { useIntl } from "react-intl";

import { Modal } from "~/components/molecules";
import { TermsAndConditions } from "~/components/organisms/TermsAndConditions";
import { Sentry } from "~/features/sentry";
import { useTermsConditions } from "~/features/termsconditions";

type AcceptTermsAmdConditionsModalProps = {
  open: boolean;
  onClose: () => void;
};

export const AcceptTermsAmdConditionsModal: React.FunctionComponent<
  AcceptTermsAmdConditionsModalProps
> = (props) => {
  const { open, onClose } = props;

  const i18n = useIntl();
  const { updateStatus } = useTermsConditions();

  const handleAccept = useCallback(() => {
    updateStatus("accepted");
  }, [updateStatus]);

  const termsConditionsTitle = i18n.formatMessage({
    id: "AcceptTermsAmdConditionsModal.termsConditionsTitle",
    defaultMessage: "Please read and accept the Terms of Use",
    description: "Title for the terms and conditions modal",
  });

  const acceptButtonLabel = i18n.formatMessage({
    id: "AcceptTermsAmdConditionsModal.acceptButtonLabel",
    defaultMessage: "Accept",
    description: "Label for the accept button in the Terms & Conditions modal",
  });

  const rejectButtonLabel = i18n.formatMessage({
    id: "AcceptTermsAmdConditionsModal.rejectButtonLabel",
    defaultMessage: "Reject",
    description: "Label for the reject button in the Terms & Conditions modal",
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={termsConditionsTitle}
      actions={[
        {
          label: acceptButtonLabel,
          onClick: handleAccept,
          variant: "contained",
        },
        {
          label: rejectButtonLabel,
          onClick: onClose,
          variant: "text",
        },
      ]}
    >
      <TermsAndConditions />
    </Modal>
  );
};
