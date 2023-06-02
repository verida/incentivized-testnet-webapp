import React, { useCallback } from "react";
import { useIntl } from "react-intl";

import { Button } from "~/components/atoms";
import { Modal } from "~/components/molecules";
import { TermsAndConditions } from "~/components/organisms/TermsAndConditions";
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
    description: "Label for the accept button",
  });

  return (
    <Modal open={open} onClose={onClose} title={termsConditionsTitle}>
      {/* TODO: Handle scroll in modal for long text */}
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center gap-12">
          <TermsAndConditions />
        </div>
        <div className="flex flex-row-reverse gap-2 mt-5 sm:mt-8 self-end">
          <Button onClick={handleAccept}>{acceptButtonLabel}</Button>
        </div>
      </div>
    </Modal>
  );
};
