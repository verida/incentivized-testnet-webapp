import type { DatastoreOpenConfig, IDatastore } from "@verida/types";
import { WebUser, type WebUserProfile } from "@verida/web-helpers";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { config } from "~/config";
import { Logger } from "~/features/logger";
import { Sentry } from "~/features/sentry";

if (!config.verida.contextName) {
  throw new Error("Verida Context Name must be defined");
}

const logger = new Logger("verida");

Sentry.setContext("verida", {
  environment: config.verida.environment,
  contextName: config.verida.contextName,
  connectLogoUrl: config.verida.connectLogoUrl,
});

const webUserInstance = new WebUser({
  debug: config.devMode,
  clientConfig: {
    environment: config.verida.environment,
    didClientConfig: {
      network: config.verida.environment,
      rpcUrl: config.verida.rpcUrl,
    },
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
  isReady: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnecting: boolean;
  isCheckingConnection: boolean;
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
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [did, setDid] = useState<string>();
  const [profile, setProfile] = useState<WebUserProfile>();

  const updateStates = useCallback(() => {
    webUserInstance
      .isConnected()
      .then((newIsConnected) => {
        setIsConnected(newIsConnected);
        setIsConnecting(false);
        setIsDisconnecting(false);
        setIsCheckingConnection(false);
        logger.info(
          newIsConnected
            ? "User is connected to Verida"
            : "User is not connected to Verida"
        );
      })
      .catch(() => {
        setIsConnected(false);
        setIsConnecting(false);
        setIsDisconnecting(false);
        setIsCheckingConnection(false);
        logger.info("User is not connected to Verida");
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
      .getPublicProfile(true)
      .then(setProfile)
      .catch(() => {
        setProfile(undefined);
      });
  }, []);

  const veridaEventListener = useCallback(() => {
    void updateStates();
  }, [updateStates]);

  useEffect(() => {
    logger.info("Initialising the Verida client");
    webUserInstance.addListener("connected", veridaEventListener);
    webUserInstance.addListener("profileChanged", veridaEventListener);
    webUserInstance.addListener("disconnected", veridaEventListener);

    const autoConnect = async () => {
      setIsCheckingConnection(true);
      await webUserInstanceRef.current.isConnected();
      // Will trigger a 'connected' event if already connected and therefore update the states
      setIsCheckingConnection(false);
    };
    void autoConnect();

    return () => {
      logger.info("Cleaning the Verida client");
      webUserInstance.removeAllListeners();
    };
  }, [updateStates, veridaEventListener]);

  // Exposing common methods for easier access than through the ref
  const connect = useCallback(async () => {
    logger.info("User connecting to Verida");

    setIsConnecting(true);
    const connected = await webUserInstanceRef.current.connect();
    setIsConnecting(false);

    logger.info(
      connected
        ? "Connection to Verida successful"
        : "User did not connect to Verida"
    );

    return connected;
  }, [webUserInstanceRef]);

  const disconnect = useCallback(async () => {
    logger.info("User disconnecting from Verida");

    setIsDisconnecting(true);
    await webUserInstanceRef.current.disconnect();
    setIsDisconnecting(false);

    logger.info("User successfully disconnected from Verida");
  }, [webUserInstanceRef]);

  const openDatastore = useCallback(
    async (schemaUrl: string, config?: DatastoreOpenConfig) => {
      logger.info("Opening Verida datastore", {
        schemaUrl,
        config,
      });

      const datastore = await webUserInstanceRef.current.openDatastore(
        schemaUrl,
        config
      );

      logger.info("Verida datastore succesfully opened", {
        schemaUrl,
        config,
      });
      return datastore;
    },
    [webUserInstanceRef]
  );

  const contextValue: VeridaContextType = useMemo(
    () => ({
      isReady: isConnected && !!did && !!profile,
      isConnected,
      isConnecting,
      isDisconnecting,
      isCheckingConnection,
      did,
      connect,
      disconnect,
      openDatastore,
      profile,
      webUserInstanceRef,
    }),
    [
      isConnected,
      isConnecting,
      isDisconnecting,
      isCheckingConnection,
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
