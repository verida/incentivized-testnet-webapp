import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useActivity } from "~/features/activity";
import { checkAirdrop1Conditions } from "~/features/airdrops/utils";
import {
  SubmitAirdrop1ProofPayload,
  airdrop1CheckProofSubmitted,
} from "~/features/api";
import { airdrop1SubmitProof } from "~/features/api";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

const logger = new Logger("Airdrops");

export function useAirdrop1() {
  const queryClient = useQueryClient();
  const { isConnected, did, profile } = useVerida();
  const { userActivities, userXpPoints } = useActivity();

  const { data: checkProofSubmittedData, isLoading: isCheckingProofSubmitted } =
    useQuery({
      queryKey: ["airdrop1", did],
      enabled: isConnected && !!did,
      staleTime: 1000 * 60 * 10, // 10 minutes
      queryFn: async () => {
        if (!isConnected || !did) {
          throw new Error("User not connected");
        }

        logger.info("Checking airdrop 1 proof exists", { did });
        return airdrop1CheckProofSubmitted(did);
      },
      onError(error) {
        logger.error("Error checking airdrop 1 proof exists", { error });
        Sentry.captureException(error);
      },
    });

  const {
    mutateAsync: submitProof,
    isLoading: isSubmittingProof,
    error: errorSubmittingProof,
  } = useMutation({
    mutationFn: async (termsAccepted: boolean) => {
      if (!isConnected || !did) {
        throw new Error("User not connected");
      }
      logger.info("Submitting airdrop 1 proof", { did });

      checkAirdrop1Conditions(userActivities, userXpPoints);

      const payload: SubmitAirdrop1ProofPayload = {
        did,
        activityProofs: userActivities,
        profile: {
          country: profile?.country,
        },
        termsAccepted,
      };

      logger.info("Submitting airdrop 1 proof", { did });
      return airdrop1SubmitProof(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["airdrop1", did]);
    },
    onError(error) {
      logger.error("Error submitting airdrop 1 proof", { error });
      Sentry.captureException(error);
    },
  });

  return {
    isProofSubmitted:
      checkProofSubmittedData?.status === "success" &&
      checkProofSubmittedData.exists,
    isCheckingProofSubmitted,
    submitProof,
    isSubmittingProof,
    errorSubmittingProof,
  };
}
