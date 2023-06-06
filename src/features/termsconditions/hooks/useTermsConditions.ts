import { useContext } from "react";

import { TermsConditionsContext } from "~/features/termsconditions/contexts";

export function useTermsConditions() {
  const context = useContext(TermsConditionsContext);
  if (context === null) {
    throw new Error(
      "useTermsConditions must be used within a TermsConditionsProvider"
    );
  }
  return context;
}
