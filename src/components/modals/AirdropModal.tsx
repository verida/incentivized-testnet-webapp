import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Airdrop1Modal } from "~/components/modals/Airdrop1Modal";
import { Airdrop2Modal } from "~/components/modals/Airdrop2Modal";
import {
  AIRDROP_1_DEFINITION,
  AIRDROP_2_DEFINITION,
} from "~/features/airdrops";

export const AirdropModal: React.FC = () => {
  const { airdropId } = useParams();

  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate("/airdrops");
  }, [navigate]);

  if (airdropId === AIRDROP_1_DEFINITION.id) {
    return <Airdrop1Modal onClose={handleClose} />;
  }

  if (airdropId === AIRDROP_2_DEFINITION.id) {
    return <Airdrop2Modal onClose={handleClose} />;
  }

  return null;
};
