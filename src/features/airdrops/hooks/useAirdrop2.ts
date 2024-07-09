import { useMutation } from "@tanstack/react-query";

import {
  Airdrop2CheckDto,
  Airdrop2ClaimDto,
  airdrop2LegacyCheckEligibility,
  claimAirdrop2,
  getAirdrop2UserStatus,
} from "~/features/api";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

const logger = new Logger("Airdrops");

export function useAirdrop2() {
  const { isConnected, did, profile } = useVerida();

  const {
    mutateAsync: checkLegacyEligbility,
    isLoading: isCheckingLegacyEligibility,
    error: errorCheckingLegacyEligibility,
  } = useMutation({
    // Not a mutation but a better DX for an on-demand query with a user-filled parameter than the useQuery hook
    mutationFn: async (walletAddress: string) => {
      logger.info("Checking airdrop 2 eligibility", {
        walletAddress,
      });
      return airdrop2LegacyCheckEligibility(walletAddress);
    },
    onError(error) {
      logger.error("Error checking airdrop 2 eligibility", { error });
      Sentry.captureException(error);
    },
  });

  const {
    mutateAsync: getUserStatus,
    isLoading: isGettingUserStatus,
    error: errorGettingUserStatus,
  } = useMutation({
    mutationFn: async ({
      termsAccepted,
      userEvmAddress,
      userEvmAddressSignature,
    }: {
      termsAccepted: boolean;
      userEvmAddress: string;
      userEvmAddressSignature: string;
    }) => {
      if (!isConnected || !did) {
        throw new Error("User not connected");
      }

      const payload: Airdrop2CheckDto = {
        did,
        profile: {
          country: profile?.country,
        },
        termsAccepted,
        userEvmAddress,
        userEvmAddressSignature,
      };

      logger.info("Checking airdrop 2", { did });
      logger.debug("Payload for checking airdrop 2", { did, payload });
      return getAirdrop2UserStatus(payload);
    },
    onError(error) {
      logger.error("Error claiming airdrop 1", { error });
      Sentry.captureException(error);
    },
  });

  const {
    mutateAsync: claim,
    isLoading: isClaiming,
    error: errorClaiming,
  } = useMutation({
    mutationFn: async ({
      termsAccepted,
      userEvmAddress,
      userEvmAddressSignature,
    }: {
      termsAccepted: boolean;
      userEvmAddress: string;
      userEvmAddressSignature: string;
    }) => {
      if (!isConnected || !did) {
        throw new Error("User not connected");
      }

      const payload: Airdrop2ClaimDto = {
        did,
        profile: {
          country: profile?.country,
        },
        termsAccepted,
        userEvmAddress: userEvmAddress,
        userEvmAddressSignature: userEvmAddressSignature,
      };

      logger.info("Claiming airdrop 2", { did });
      logger.debug("Payload for claiming airdrop 2", { did, payload });
      return claimAirdrop2(payload);
    },
    onError(error) {
      logger.error("Error claiming airdrop 2", { error });
      Sentry.captureException(error);
    },
  });

  return {
    checkLegacyEligbility,
    isCheckingLegacyEligibility,
    errorCheckingLegacyEligibility,
    getUserStatus,
    isGettingUserStatus,
    errorGettingUserStatus,
    claim,
    isClaiming,
    errorClaiming,
  };
}
