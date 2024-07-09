import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms";
import {
  AirdropAcceptTermsModalContent,
  AirdropCheckCryptoWalletModalContent,
  AirdropCheckStatusModalContent,
  AirdropClaimConfirmationModalContent,
  AirdropClaimFailureModalContent,
  AirdropClaimSuccessModalContent,
  AirdropNotEligibleModalContent,
  AirdropNotRegisteredModalContent,
} from "~/components/organisms";
import { Modal } from "~/components/templates";
import {
  AIRDROPS_CRYPTO_WALLET_MESSAGE_TO_SIGN,
  AIRDROP_2_DEFINITION,
  useAirdrop2,
} from "~/features/airdrops";
import {
  Airdrop2CheckSuccessResponse,
  Airdrop2ClaimSuccessResponse,
  ApiErrorResponse,
} from "~/features/api";
import { useWalletConnect } from "~/features/walletconnect";

export type Airdrop2ClaimModalProps = {
  onClose: () => void;
};

export const Airdrop2ClaimModal: React.FC<Airdrop2ClaimModalProps> = (
  props
) => {
  const { onClose } = props;

  const { getUserStatus, isGettingUserStatus, claim, isClaiming } =
    useAirdrop2();
  const isGettingUserStatusRef = useRef(false);
  const {
    address: cryptoWalletAddress,
    isConnected: isCryptoWalletConnected,
    connect: connectCryptoWallet,
    signMessage,
  } = useWalletConnect();

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [signedMessage, setSignedMessage] = useState<string | null>(null);
  const [isSigningMessage, setIsSigningMessage] = useState(false);
  const [userStatusResult, setUserStatusResult] = useState<
    Airdrop2CheckSuccessResponse | ApiErrorResponse | null
  >(null);
  const [claimResult, setClaimResult] = useState<
    Airdrop2ClaimSuccessResponse | ApiErrorResponse | null
  >(null);

  useEffect(() => {
    if (
      !isTermsAccepted ||
      !cryptoWalletAddress ||
      !signedMessage ||
      isGettingUserStatusRef.current ||
      userStatusResult
    ) {
      return;
    }

    const execute = async () => {
      isGettingUserStatusRef.current = true;
      const result = await getUserStatus({
        termsAccepted: isTermsAccepted,
        userEvmAddress: cryptoWalletAddress,
        userEvmAddressSignature: signedMessage,
      });
      setUserStatusResult(result);
      isGettingUserStatusRef.current = false;
    };

    void execute();
  }, [
    isTermsAccepted,
    cryptoWalletAddress,
    signedMessage,
    getUserStatus,
    userStatusResult,
  ]);

  const handleClose = useCallback(() => {
    setIsTermsAccepted(false);
    setSignedMessage(null);
    onClose();
  }, [onClose]);

  const handleAcceptTerms = useCallback(() => {
    setIsTermsAccepted(true);
  }, []);

  const handleClaim = useCallback(() => {
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

  const modalTitle = i18n.formatMessage(AIRDROP_2_DEFINITION.title);

  const acceptTermsButtonLabel = i18n.formatMessage({
    id: "Airdrop2ClaimModal.acceptTermsButtonLabel",
    defaultMessage: "Accept",
    description:
      "Label for the button to accept the terms and conditions in the airdrop 2 claim modal",
  });

  const connectCryptoWalletButtonLabel = i18n.formatMessage({
    id: "Airdrop2ClaimModal.connectCryptoWalletButtonLabel",
    defaultMessage: "Connect your wallet",
    description:
      "Label for the button to connect the crypto wallet in the airdrop 2 claim modal",
  });

  const signMessageButtonLabel = i18n.formatMessage({
    id: "Airdrop2ClaimModal.signMessageButtonLabel",
    defaultMessage: "Sign message",
    description:
      "Label for the button to connect the crypto wallet in the airdrop 2 claim modal",
  });

  const closeButtonLabel = i18n.formatMessage({
    id: "Airdrop2ClaimModal.closeButtonLabel",
    defaultMessage: "Got It",
    description:
      "Label for the button to close the modal in the airdrop 2 claim modal",
  });

  const claimButtonLabel = i18n.formatMessage({
    id: "Airdrop2ClaimModal.claimButtonLabel",
    defaultMessage: "Claim",
    description: "Label for the submit button in the airdrop 2 claim modal",
  });

  return (
    <Modal
      open
      title={modalTitle}
      onClose={handleClose}
      actions={
        !isTermsAccepted
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
              : isGettingUserStatus ||
                  isGettingUserStatusRef.current ||
                  !userStatusResult ||
                  userStatusResult.status === "error"
                ? []
                : !userStatusResult.isRegistered
                  ? [
                      {
                        label: closeButtonLabel,
                        onClick: handleClose,
                        variant: "contained",
                        color: "primary",
                      },
                    ]
                  : userStatusResult.isClaimed ||
                      claimResult?.status === "success" ||
                      claimResult?.status === "error"
                    ? []
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
                              <span>{claimButtonLabel}</span>
                            </>
                          ),
                          onClick: handleClaim,
                          variant: "contained",
                          color: "primary",
                          disabled: isClaiming,
                        },
                      ]
      }
    >
      {!isTermsAccepted ? (
        <AirdropAcceptTermsModalContent />
      ) : !isCryptoWalletConnected || !signedMessage ? (
        <AirdropCheckCryptoWalletModalContent />
      ) : isGettingUserStatus ||
        isGettingUserStatusRef.current ||
        !userStatusResult ? (
        <AirdropCheckStatusModalContent />
      ) : userStatusResult.status === "error" ? (
        // TODO: Deal if the error is an internal error
        // TODO: Pass error to the component to display a message to the user
        <AirdropNotEligibleModalContent />
      ) : !userStatusResult.isRegistered ? (
        <AirdropNotRegisteredModalContent />
      ) : userStatusResult.isClaimed ? (
        <AirdropClaimSuccessModalContent
          claimedTokenAmount={userStatusResult.claimedTokenAmount ?? undefined}
          transactionExplorerUrl={
            userStatusResult.claimTransactionUrl ?? undefined
          }
        />
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
          claimableTokenAmount={userStatusResult.claimableTokenAmount ?? 0}
          blockchainAddress={cryptoWalletAddress}
        />
      )}
    </Modal>
  );
};
