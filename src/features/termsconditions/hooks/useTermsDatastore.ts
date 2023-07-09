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
      const datastore = await openDatastore(TERMS_SCHEMA_LATEST_URL);
      setTermsDatastore(datastore);
    };

    try {
      void getDatastore();
    } catch (error: unknown) {
      Sentry.captureException(error);
    }
  }, [isConnected, openDatastore]);

  return { termsDatastore };
}
