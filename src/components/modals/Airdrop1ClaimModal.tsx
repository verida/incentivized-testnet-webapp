import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms";
import {
  AirdropClaimCheckStatusModalContent,
  AirdropClaimConfirmationModalContent,
  AirdropClaimFailureModalContent,
  AirdropClaimNotRegisteredModalContent,
  AirdropClaimSuccessModalContent,
  AirdropClaimTermsModalContent,
} from "~/components/organisms";
import { Modal } from "~/components/templates";
import { AIRDROP_1_DEFINITION, useAirdrop1 } from "~/features/airdrops";
import { Airdrop1ClaimSuccessResponse, ApiErrorResponse } from "~/features/api";

export type Airdrop1ClaimModalProps = {
  onClose: () => void;
};

export const Airdrop1ClaimModal: React.FC<Airdrop1ClaimModalProps> = (
  props
) => {
  const { onClose } = props;

  const { isGettingUserStatus, userStatus, isClaiming, claim } = useAirdrop1();

  const [claimResult, setClaimResult] = useState<
    Airdrop1ClaimSuccessResponse | ApiErrorResponse | null
  >(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // TODO: Get the address from the user's wallet connection
  const [userBlockchainAddress] = useState<string>("-");

  const handleClose = useCallback(() => {
    setIsTermsAccepted(false);
    onClose();
  }, [onClose]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const execute = async () => {
      setClaimResult(null);
      const result = await claim({
        termsAccepted: isTermsAccepted,
        userEvmAddress: userBlockchainAddress, // TODO: To be implemented
        userEvmAddressSignature: "", // TODO: To be implemented
      });
      setClaimResult(result);
    };
    void execute();
  }, [isTermsAccepted, userBlockchainAddress, claim]);

  const i18n = useIntl();

  const modalTitle = i18n.formatMessage(AIRDROP_1_DEFINITION.title);

  const acceptTermsButtonLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.acceptTermsButtonLabel",
    defaultMessage: "Accept",
    description:
      "Label for the button to accept the terms and conditions in the airdrop 1 claim modal",
  });

  const submitButtonLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.submitButtonLabel",
    defaultMessage: "Claim",
    description: "Label for the submit button in the airdrop 1 claim modal",
  });

  const closeButtonLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.closeButtonLabel",
    defaultMessage: "Got It",
    description:
      "Label for the button to close the modal in the airdrop claim modal",
  });

  return (
    <Modal
      open
      onClose={handleClose}
      title={modalTitle}
      actions={
        isGettingUserStatus || !userStatus
          ? []
          : !userStatus.isRegistered
            ? [
                {
                  label: closeButtonLabel,
                  onClick: handleClose,
                  variant: "contained",
                  color: "primary",
                },
              ]
            : userStatus.isClaimed ||
                claimResult?.status === "success" ||
                claimResult?.status === "error"
              ? []
              : !isTermsAccepted
                ? [
                    {
                      label: acceptTermsButtonLabel,
                      onClick: handleAcceptTerms,
                      variant: "contained",
                      color: "primary",
                    },
                  ]
                : [
                    {
                      label: (
                        <>
                          {isClaiming ? (
                            <Icon
                              type="loading"
                              className="animate-spin-slow"
                            />
                          ) : null}
                          <span>{submitButtonLabel}</span>
                        </>
                      ),
                      onClick: handleSubmit,
                      variant: "contained",
                      color: "primary",
                      disabled: isClaiming,
                    },
                  ]
      }
    >
      {isGettingUserStatus || !userStatus ? (
        <AirdropClaimCheckStatusModalContent />
      ) : !userStatus.isRegistered ? (
        <AirdropClaimNotRegisteredModalContent />
      ) : userStatus.isClaimed ? (
        <AirdropClaimSuccessModalContent
          claimedTokenAmount={userStatus?.claimedTokenAmount ?? undefined}
          // transactionExplorerUrl={userStatus?.transactionExplorerUrl ?? undefined} // use if the transaction is included in the user status
        />
      ) : !isTermsAccepted ? (
        <AirdropClaimTermsModalContent />
      ) : claimResult?.status === "success" ? (
        <AirdropClaimSuccessModalContent
          claimedTokenAmount={claimResult?.claimedTokenAmount ?? undefined}
          transactionExplorerUrl={claimResult?.transactionExplorerUrl}
        />
      ) : claimResult?.status === "error" ? (
        <AirdropClaimFailureModalContent
          errorMessage={claimResult.errorMessage}
          errorUserMessage={claimResult.errorUserMessage}
        />
      ) : (
        <AirdropClaimConfirmationModalContent
          claimableTokenAmount={userStatus.claimableTokenAmount ?? 0}
          blockchainAddress={userBlockchainAddress}
        />
      )}
    </Modal>
  );
};
