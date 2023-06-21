import { DatastoreOpenConfig, IDatastore } from "@verida/types";
import { WebUser, WebUserProfile } from "@verida/web-helpers";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { config } from "~/config";
import { Sentry } from "~/features/sentry";

if (!config.verida.contextName) {
  throw new Error("Verida Context Name must be defined");
}

Sentry.setContext("verida", {
  environment: config.verida.environment,
  contextName: config.verida.contextName,
  connectLogoUrl: config.verida.connectLogoUrl,
});

const webUserInstance = new WebUser({
  debug: true,
  clientConfig: {
    environment: config.verida.environment,
  },
  contextConfig: {
    name: config.verida.contextName,
  },
  accountConfig: {
    request: {
      logoUrl: config.verida.connectLogoUrl,
    },
  },
});

type VeridaContextType = {
  webUserInstanceRef: React.MutableRefObject<WebUser>;
  isConnected: boolean;
  did: string | undefined;
  profile: WebUserProfile | undefined;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  openDatastore: (
    schemaUrl: string,
    config?: DatastoreOpenConfig
  ) => Promise<IDatastore>;
};

export const VeridaContext = React.createContext<VeridaContextType | null>(
  null
);

type VeridaProviderProps = {
  children?: React.ReactNode;
};

export const VeridaProvider: React.FunctionComponent<VeridaProviderProps> = (
  props
) => {
  const webUserInstanceRef = useRef(webUserInstance);

  const [isConnected, setIsConnected] = useState(false);
  const [did, setDid] = useState<string>();
  const [profile, setProfile] = useState<WebUserProfile>();

  const updateStates = useCallback(() => {
    webUserInstance
      .isConnected()
      .then(setIsConnected)
      .catch(() => {
        setIsConnected(false);
      });
    webUserInstance
      .getDid()
      .then((newDid) => {
        setDid(newDid);
        Sentry.setUser({ id: newDid });
      })
      .catch(() => {
        setDid(undefined);
        Sentry.setUser(null);
      });
    webUserInstance
      .getPublicProfile()
      .then(setProfile)
      .catch(() => {
        setProfile(undefined);
      });
  }, []);

  const veridaEventListener = useCallback(() => {
    void updateStates();
  }, [updateStates]);

  useEffect(() => {
    Sentry.addBreadcrumb({
      category: "VeridaProvider",
      level: "info",
      message: "Initialising the Verida client",
    });
    webUserInstance.addListener("connected", veridaEventListener);
    webUserInstance.addListener("profileChanged", veridaEventListener);
    webUserInstance.addListener("disconnected", veridaEventListener);
    void webUserInstance.isConnected(); // Will trigger a 'connected' event if already connected and therefore update the states
    return () => {
      Sentry.addBreadcrumb({
        category: "VeridaProvider",
        level: "info",
        message: "Cleaning the Verida client",
      });
      webUserInstance.removeAllListeners();
    };
  }, [updateStates, veridaEventListener]);

  // Exposing common methods for easier access than through the ref
  const connect = useCallback(async () => {
    Sentry.addBreadcrumb({
      category: "VeridaProvider",
      type: "Authentication",
      level: "info",
      message: "User connecting to Verida",
    });

    const connected = await webUserInstanceRef.current.connect();

    Sentry.addBreadcrumb({
      category: "VeridaProvider",
      type: "Authentication",
      level: "info",
      message: connected
        ? "User connected to Verida"
        : "User did not connect to Verida",
    });

    return connected;
  }, [webUserInstanceRef]);

  const disconnect = useCallback(async () => {
    Sentry.addBreadcrumb({
      category: "VeridaProvider",
      type: "Authentication",
      level: "info",
      message: "User disconnecting from Verida",
    });

    await webUserInstanceRef.current.disconnect();

    Sentry.addBreadcrumb({
      category: "VeridaProvider",
      type: "Authentication",
      level: "info",
      message: "User disconnected from Verida",
    });
  }, [webUserInstanceRef]);

  const openDatastore = useCallback(
    async (schemaUrl: string, config?: DatastoreOpenConfig) => {
      Sentry.addBreadcrumb({
        category: "VeridaProvider",
        level: "info",
        message: "Opening Verida datastore",
        data: {
          schemaUrl,
          config,
        },
      });

      const datastore = await webUserInstanceRef.current.openDatastore(
        schemaUrl,
        config
      );

      Sentry.addBreadcrumb({
        category: "VeridaProvider",
        level: "info",
        message: "Verida datastore succesfully",
        data: {
          schemaUrl,
          config,
        },
      });
      return datastore;
    },
    [webUserInstanceRef]
  );

  const contextValue: VeridaContextType = useMemo(
    () => ({
      isConnected,
      did,
      connect,
      disconnect,
      openDatastore,
      profile,
      webUserInstanceRef,
    }),
    [
      isConnected,
      did,
      connect,
      disconnect,
      openDatastore,
      profile,
      webUserInstanceRef,
    ]
  );

  return (
    <VeridaContext.Provider value={contextValue}>
      {props.children}
    </VeridaContext.Provider>
  );
};
