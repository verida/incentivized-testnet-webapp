import { type IDatastore } from "@verida/types";
import { useEffect, useState } from "react";

import { ACTIVITIES_SCHEMA_LATEST_URL } from "~/features/activity/constants";
import { Sentry } from "~/features/sentry";
import { useVerida } from "~/features/verida";

export function useActivitiesDatastore() {
  const [activitiesDatastore, setActivitiesDatastore] =
    useState<IDatastore | null>(null);
  const { isConnected, openDatastore } = useVerida();

  useEffect(() => {
    if (!isConnected) {
      setActivitiesDatastore(null);
      return;
    }

    const getDatastore = async () => {
      try {
        const datastore = await openDatastore(ACTIVITIES_SCHEMA_LATEST_URL);
        setActivitiesDatastore(datastore);
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message === "Not connected to Verida network"
          // TODO: Add a more resilient match on the error type
        ) {
          setActivitiesDatastore(null);
        }
        Sentry.captureException(error);
      }
    };

    void getDatastore();
  }, [isConnected, openDatastore]);

  return { activitiesDatastore };
}
