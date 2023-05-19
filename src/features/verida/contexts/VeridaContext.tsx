import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WebUser, WebUserProfile } from "@verida/web-helpers";
import { config } from "config";

if (!config.veridaContextName) {
  throw new Error("Verida Context Name must be defined");
}

const webUserInstance = new WebUser({
  debug: true,
  clientConfig: {
    environment: config.veridaEnv,
  },
  contextConfig: {
    name: config.veridaContextName,
  },
  accountConfig: {
    request: {
      logoUrl: config.veridaLogoUrl,
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
      .then(setDid)
      .catch(() => {
        setDid(undefined);
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
    updateStates();
    webUserInstance.addListener("connected", veridaEventListener);
    webUserInstance.addListener("profileChanged", veridaEventListener);
    webUserInstance.addListener("disconnected", veridaEventListener);
    return () => {
      webUserInstance.removeListener("connected", veridaEventListener);
      webUserInstance.removeListener("profileChanged", veridaEventListener);
      webUserInstance.removeListener("disconnected", veridaEventListener);
    };
  }, [updateStates, veridaEventListener]);

  // Exposing common methods for easier access than through the ref
  const connect = useCallback(() => {
    return webUserInstanceRef.current.connect();
  }, [webUserInstanceRef]);

  const disconnect = useCallback(() => {
    return webUserInstanceRef.current.disconnect();
  }, [webUserInstanceRef]);

  const contexValue: VeridaContextType = useMemo(
    () => ({
      isConnected,
      did,
      connect,
      disconnect,
      profile,
      webUserInstanceRef,
    }),
    [isConnected, did, connect, disconnect, profile, webUserInstanceRef]
  );

  return (
    <VeridaContext.Provider value={contexValue}>
      {props.children}
    </VeridaContext.Provider>
  );
};
