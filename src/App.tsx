/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from "react";
import { useVerida } from "features/verida";

export const App: React.FunctionComponent = () => {
  const { connect, disconnect, did, isConnected, profile } = useVerida();

  return (
    <div>
      <p>did: {did || "<not connected>"}</p>
      {isConnected ? (
        <button onClick={() => void disconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => void connect()}>Connect</button>
      )}
      {isConnected && profile !== undefined ? (
        <p> {JSON.stringify(profile)}</p>
      ) : null}
    </div>
  );
};
