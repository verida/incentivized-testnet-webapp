import React from "react";
import { HelmetProvider } from "react-helmet-async";

import { ActivityProvider } from "~/features/activity";
import { AirdropsProvider } from "~/features/airdrops";
import { IntlProvider } from "~/features/i18n";
import { Notifications } from "~/features/notifications";
import { VeridaProvider } from "~/features/verida";
import { WalletConnectProvider } from "~/features/walletconnect";

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
          <WalletConnectProvider>
            <ActivityProvider>
              <AirdropsProvider>
                <HelmetProvider>
                  {props.children}
                  <Notifications />
                </HelmetProvider>
              </AirdropsProvider>
            </ActivityProvider>
          </WalletConnectProvider>
        </VeridaProvider>
      </IntlProvider>
    </QueryProvider>
  );
};
