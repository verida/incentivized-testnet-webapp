import { type IDatastore } from "@verida/types";
import { useEffect, useState } from "react";

import { Sentry } from "~/features/sentry";
import { TERMS_SCHEMA_LATEST_URL } from "~/features/termsconditions/constants";
import { useVerida } from "~/features/verida";

export function useTermsDatastore() {
  const [termsDatastore, setTermsDatastore] = useState<IDatastore | null>(null);
  const { isConnected, openDatastore } = useVerida();

  useEffect(() => {
    if (!isConnected) {
      setTermsDatastore(null);
      return;
    }

    const getDatastore = async () => {
      try {
        const datastore = await openDatastore(TERMS_SCHEMA_LATEST_URL);
        setTermsDatastore(datastore);
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message === "Not connected to Verida network"
          // TODO: Add a more resilient match on the error type
        ) {
          setTermsDatastore(null);
        }
        Sentry.captureException(error);
      }
    };

    void getDatastore();
  }, [isConnected, openDatastore]);

  return { termsDatastore };
}
