import { useContext } from "react";

import { ActivityContext } from "~/features/activities";

export function useActivity() {
  const context = useContext(ActivityContext);
  if (context === null) {
    throw new Error("useActivity must be used within a ActivityProvider");
  }
  return context;
}
