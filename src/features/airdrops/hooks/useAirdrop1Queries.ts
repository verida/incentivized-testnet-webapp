import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useActivity } from "~/features/activity";
import { SubmitAirdrop1ProofPayload } from "~/features/airdrops/types";
import {
  checkAirdrop1Conditions,
  checkAirdrop1ProofSubmitted,
  getLocation,
  submitAirdrop1Proof,
} from "~/features/airdrops/utils";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

const logger = new Logger("Airdrops");

export function useAirdrop1Queries() {
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
          throw new Error("Cannot check existing claim when not connected");
        }
        logger.info("Checking claim exists", { did });
        return checkAirdrop1ProofSubmitted(did);
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

      const location = await getLocation();

      const payload: SubmitAirdrop1ProofPayload = {
        did,
        activityProofs: userActivities,
        profile: {
          country: profile?.country,
        },
        location,
        termsAccepted,
      };

      return submitAirdrop1Proof(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["airdrop1", did]);
    },
    onError(error) {
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
