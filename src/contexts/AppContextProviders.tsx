import React from "react";
import { HelmetProvider } from "react-helmet-async";

import { ActivityProvider } from "~/features/activity";
import { IntlProvider } from "~/features/i18n";
import { Notifications } from "~/features/notifications";
import { VeridaProvider } from "~/features/verida";

import { QueryProvider } from "./QueryContext";

export type AppContextProvidersProps = {
  children: React.ReactNode;
};

export const AppContextProviders: React.FunctionComponent<
  AppContextProvidersProps
> = (props) => {
  return (
    <QueryProvider>
      <IntlProvider>
        <VeridaProvider>
          <ActivityProvider>
            <HelmetProvider>
              {props.children}
              <Notifications />
            </HelmetProvider>
          </ActivityProvider>
        </VeridaProvider>
      </IntlProvider>
    </QueryProvider>
  );
};
