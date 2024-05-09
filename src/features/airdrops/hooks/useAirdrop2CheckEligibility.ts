import { useMutation } from "@tanstack/react-query";

import { airdrop2CheckEligibility } from "~/features/api";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";

const logger = new Logger("Airdrops");

export function useAirdrop2CheckEligibility() {
  const {
    mutateAsync: checkEligbility,
    isLoading: isChecking,
    error,
  } = useMutation({
    // Not a mutation but a better DX for an on-demand query with a user-filled parameter than the useQuery hook
    mutationFn: async (walletAddress: string) => {
      logger.info("Checking airdrop 2 eligibility", {
        walletAddress,
      });
      return airdrop2CheckEligibility(walletAddress);
    },
    onError(error) {
      logger.error("Error checking airdrop 2 eligibility", { error });
      Sentry.captureException(error);
    },
  });

  return {
    checkEligbility,
    isChecking,
    error,
  };
}
