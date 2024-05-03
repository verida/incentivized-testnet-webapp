import { useQuery } from "@tanstack/react-query";

import { checkAirdrop2Eligibility } from "~/features/airdrops/utils";
import { Logger } from "~/features/logger";
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
          throw new Error("Cannot check eligibility when not connected");
        }
        logger.info("Checking eligibility", { did });
        return checkAirdrop2Eligibility(did);
      },
    });

  return {
    isEligible:
      checkEligibilityData?.status === "success" &&
      checkEligibilityData.isEligible,
    isCheckingEligibility,
  };
}
