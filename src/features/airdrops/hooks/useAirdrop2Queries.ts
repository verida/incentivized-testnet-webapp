import { useQuery } from "@tanstack/react-query";

import { airdrop2CheckEligibility } from "~/features/api";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

const logger = new Logger("Airdrops");

export function useAirdrop2Queries() {
  const { isConnected, did } = useVerida();

  const { data: checkEligibilityData, isLoading: isCheckingEligibility } =
    useQuery({
      queryKey: ["airdrop2", did],
      enabled: isConnected && !!did,
      staleTime: 1000 * 60 * 10, // 10 minutes
      queryFn: async () => {
        if (!isConnected || !did) {
          throw new Error("User not connected");
        }

        logger.info("Checking airdrop 2 eligibility", { did });
        return airdrop2CheckEligibility(did);
      },
      onError(error) {
        logger.error("Error checking airdrop 2 eligibility", { error });
        Sentry.captureException(error);
      },
    });

  return {
    isEligible:
      checkEligibilityData?.status === "success" &&
      checkEligibilityData.isEligible,
    isCheckingEligibility,
  };
}
