import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useActivity } from "~/features/activity";
import { Logger } from "~/features/logger";
import { SubmitClaimRequestPayload } from "~/features/rewards/types";
import {
  checkClaimConditions,
  checkClaimExists,
  submitClaimRequest,
} from "~/features/rewards/utils";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

const logger = new Logger("rewards");

export function useRewardsQueries() {
  const queryClient = useQueryClient();
  const { isConnected, did, profile } = useVerida();
  const { userActivities, userXpPoints } = useActivity();

  const { data: claimExistsData, isLoading: isCheckingClaimExists } = useQuery({
    queryKey: ["claimExists", did],
    enabled: isConnected && !!did,
    staleTime: 1000 * 60 * 10, // 10 minutes
    queryFn: async () => {
      if (!isConnected || !did) {
        throw new Error("Cannot check existing claim when not connected");
      }
      logger.info("Checking claim exists", { did });
      return checkClaimExists(did);
    },
  });

  const {
    mutateAsync: submitClaim,
    isLoading: isSubmittingClaim,
    error: errorSubmittingClaim,
  } = useMutation({
    mutationFn: async (walletAddress: string) => {
      if (!isConnected || !did) {
        throw new Error("Cannot submit claim when not connected");
      }
      logger.info("Submitting claim", { did });

      checkClaimConditions(userActivities, userXpPoints);

      const payload: SubmitClaimRequestPayload = {
        did,
        userWalletAddress: walletAddress,
        activityProofs: userActivities,
        profile: {
          name: profile?.name || "",
          country: profile?.country || "",
        },
      };

      return submitClaimRequest(payload);
    },
    onSuccess: async () => {
      // TODO: Optimise with an optimistic update
      await queryClient.invalidateQueries(["claimExists", did]);
    },
    onError(error) {
      Sentry.captureException(error);
    },
  });

  return {
    isClaimExists:
      claimExistsData?.status === "success" && !!claimExistsData?.exists,
    isCheckingClaimExists,
    submitClaim,
    isSubmittingClaim,
    errorSubmittingClaim,
  };
}
