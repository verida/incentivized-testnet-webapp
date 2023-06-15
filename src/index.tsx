import React from "react";
import ReactDOM from "react-dom/client";

import { AppWithSentry } from "~/App";
import { initSentry } from "~/features/sentry";
import "~/styles/index.css";

initSentry();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AppWithSentry />);
