import { useContext } from "react";

import { VeridaContext } from "~/features/verida/contexts";

export const useVerida = () => {
  const context = useContext(VeridaContext);
  if (context === null) {
    throw new Error("useVerida must be used within a VeridaProvider");
  }
  return context;
};
