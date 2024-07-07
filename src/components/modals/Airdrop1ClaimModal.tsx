import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms";
import {
  AirdropClaimCheckCryptoWalletModalContent,
  AirdropClaimCheckStatusModalContent,
  AirdropClaimConfirmationModalContent,
  AirdropClaimFailureModalContent,
  AirdropClaimNotRegisteredModalContent,
  AirdropClaimSuccessModalContent,
  AirdropClaimTermsModalContent,
} from "~/components/organisms";
import { Modal } from "~/components/templates";
import {
  AIRDROPS_CRYPTO_WALLET_MESSAGE_TO_SIGN,
  AIRDROP_1_DEFINITION,
  useAirdrop1,
} from "~/features/airdrops";
import { Airdrop1ClaimSuccessResponse, ApiErrorResponse } from "~/features/api";
import { useWalletConnect } from "~/features/walletconnect";

export type Airdrop1ClaimModalProps = {
  onClose: () => void;
};

export const Airdrop1ClaimModal: React.FC<Airdrop1ClaimModalProps> = (
  props
) => {
  const { onClose } = props;

  const { isGettingUserStatus, userStatus, isClaiming, claim } = useAirdrop1();
  const {
    address: cryptoWalletAddress,
    isConnected: isCryptoWalletConnected,
    connect: connectCryptoWallet,
    signMessage,
  } = useWalletConnect();

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [signedMessage, setSignedMessage] = useState<string | null>(null);
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [claimResult, setClaimResult] = useState<
    Airdrop1ClaimSuccessResponse | ApiErrorResponse | null
  >(null);

  const handleClose = useCallback(() => {
    setIsTermsAccepted(false);
    setSignedMessage(null);
    onClose();
  }, [onClose]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!cryptoWalletAddress || !signedMessage) {
      return;
    }

    const execute = async () => {
      setClaimResult(null);
      const result = await claim({
        termsAccepted: isTermsAccepted,
        userEvmAddress: cryptoWalletAddress,
        userEvmAddressSignature: signedMessage,
      });
      setClaimResult(result);
    };

    void execute();
  }, [isTermsAccepted, cryptoWalletAddress, signedMessage, claim]);

  const handleSignMessage = useCallback(() => {
    if (!isCryptoWalletConnected) {
      return;
    }

    const execute = async () => {
      setIsSigningMessage(true);
      const signature = await signMessage(
        AIRDROPS_CRYPTO_WALLET_MESSAGE_TO_SIGN
      );
      setSignedMessage(signature);
      setIsSigningMessage(false);
    };

    void execute();
  }, [isCryptoWalletConnected, signMessage]);

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

  const connectCryptoWalletButtonLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.connectCryptoWalletButtonLabel",
    defaultMessage: "Connect your wallet",
    description:
      "Label for the button to connect the crypto wallet in the airdrop claim modal",
  });

  const signMessageButtonLabel = i18n.formatMessage({
    id: "Airdrop1ClaimModal.signMessageButtonLabel",
    defaultMessage: "Sign message",
    description:
      "Label for the button to connect the crypto wallet in the airdrop claim modal",
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
                : !isCryptoWalletConnected
                  ? [
                      {
                        label: connectCryptoWalletButtonLabel,
                        onClick: connectCryptoWallet,
                        variant: "contained",
                        color: "primary",
                      },
                    ]
                  : !signedMessage
                    ? [
                        {
                          label: signMessageButtonLabel,
                          onClick: handleSignMessage,
                          variant: "contained",
                          color: "primary",
                          disabled: isSigningMessage,
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
          transactionExplorerUrl={userStatus?.claimTransactionUrl ?? undefined}
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
      ) : !isCryptoWalletConnected || !signedMessage ? (
        <AirdropClaimCheckCryptoWalletModalContent />
      ) : (
        <AirdropClaimConfirmationModalContent
          claimableTokenAmount={userStatus.claimableTokenAmount ?? 0}
          blockchainAddress={cryptoWalletAddress}
        />
      )}
    </Modal>
  );
};
