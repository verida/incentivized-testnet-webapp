import React from "react";
import ReactDOM from "react-dom/client";
import "styles/index.css";
import { App } from "./App";
import { AppContextProviders } from "contexts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProviders>
      <App />
    </AppContextProviders>
  </React.StrictMode>
);
