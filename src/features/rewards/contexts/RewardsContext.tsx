import React, { createContext, useCallback, useMemo, useState } from "react";

import { RewardsModal } from "~/components/modals";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { Logger } from "~/features/logger";
import { useVerida } from "~/features/verida";

// TODO: Temporary wallet address
const userWalletAddress = "0x2e6F96d19bA666509eD9B2d65CbaD2Ff541Cc826";

const logger = new Logger("Rewards");

type RewardsContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  submitWallet: () => Promise<void>;
};

export const RewardsContext = createContext<RewardsContextType | null>(null);

export type RewardsContextProps = {
  children: React.ReactNode;
};

export const RewardsProvider: React.FunctionComponent<RewardsContextProps> = (
  props
) => {
  const { children } = props;

  const { isConnected, did, profile } = useVerida();
  const { userActivities, userXpPoints } = useActivity();

  // TODO: Turn to url param
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const submitWallet = useCallback(async () => {
    if (!isConnected) {
      return;
    }

    if (userXpPoints < config.claim.minPoints) {
      throw new Error("Insufficient XP points");
    }

    if (!userActivities.length) {
      throw new Error(
        "No activities completed, so unable to submit airdrop claim"
      );
    }

    const payload = {
      did,
      userWalletAddress,
      activityProofs: userActivities,
      profile: {
        name: profile ? profile.name : "",
        country: profile ? profile.country : "",
      },
    };

    logger.debug("Payload", payload);

    const api = config.claim.apiUrl;
    if (!api) {
      throw new Error("No API URL set");
    }

    try {
      const result = await fetch(api, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      logger.debug("Submit wallet result", { result });
    } catch (error) {
      logger.error("Error submitting wallet", { error });
    }
  }, [did, isConnected, profile, userActivities, userXpPoints]);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      openModal,
      closeModal,
      submitWallet,
    }),
    [isModalOpen, openModal, closeModal, submitWallet]
  );

  return (
    <RewardsContext.Provider value={contextValue}>
      {children}
      <RewardsModal />
    </RewardsContext.Provider>
  );
};
