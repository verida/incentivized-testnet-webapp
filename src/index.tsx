import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "~/App";
import { AppContextProviders } from "~/contexts";
import { ErrorBoundary } from "~/features/errors";
import "~/styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary
      noIntl
      defaultFallbackCardClassName="h-screen w-screen flex flex-col items-center justify-center"
    >
      <AppContextProviders>
        <App />
      </AppContextProviders>
    </ErrorBoundary>
  </React.StrictMode>
);
