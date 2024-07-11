import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { useActivity } from "~/features/activity";
import { checkAirdrop1Conditions } from "~/features/airdrops/utils";
import {
  Airdrop1ClaimDto,
  Airdrop1RegistrationDto,
  claimAirdrop1,
  getAirdrop1Status,
} from "~/features/api";
import { registerAirdrop1 } from "~/features/api";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

const logger = new Logger("Airdrops");

export function useAirdrop1() {
  const queryClient = useQueryClient();
  const { isConnected, did, profile } = useVerida();
  const { userActivities, userXpPoints } = useActivity();

  const { data: statusData, isLoading: isGettingUserStatus } = useQuery({
    queryKey: ["airdrop1", did],
    enabled: isConnected && !!did,
    queryFn: async () => {
      if (!isConnected || !did) {
        throw new Error("User not connected");
      }
      return getAirdrop1Status(did);
    },
    onError(error) {
      logger.error("Error getting airdrop 1 status", { error });
      Sentry.captureException(error);
    },
  });

  const userStatus = useMemo(() => {
    if (!statusData || statusData.status !== "success") {
      return null;
    }

    const { status: requestStatus, ...userStatus } = statusData;

    return userStatus;
  }, [statusData]);

  const {
    mutateAsync: register,
    isLoading: isRegistering,
    error: errorRegistering,
  } = useMutation({
    mutationFn: async (termsAccepted: boolean) => {
      if (!isConnected || !did) {
        throw new Error("User not connected");
      }

      logger.info("Checking conditions for airdrop 1 registration", { did });
      checkAirdrop1Conditions(userActivities, userXpPoints);

      const payload: Airdrop1RegistrationDto = {
        did,
        activityProofs: userActivities,
        profile: {
          country: profile?.country,
        },
        termsAccepted,
      };

      logger.info("Registering for airdrop 1", { did });
      return registerAirdrop1(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["airdrop1", did]);
    },
    onError(error) {
      logger.error("Error registering for airdrop 1", { error });
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

      const payload: Airdrop1ClaimDto = {
        did,
        termsAccepted,
        userEvmAddress: userEvmAddress,
        userEvmAddressSignature: userEvmAddressSignature,
      };

      return claimAirdrop1(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["airdrop1", did]);
    },
    onError(error) {
      logger.error("Error claiming airdrop 1", { error });
      Sentry.captureException(error);
    },
  });

  return {
    isGettingUserStatus,
    userStatus,
    register,
    isRegistering,
    errorRegistering,
    claim,
    isClaiming,
    errorClaiming,
  };
}
