import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider as TextBalancerProvider } from "react-wrap-balancer";

import { ActivityProvider } from "~/features/activity";
import { IntlProvider } from "~/features/i18n";
import { Notifications } from "~/features/notifications";
import { TermsConditionsProvider } from "~/features/termsconditions";
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
          <TermsConditionsProvider>
            <ActivityProvider>
              <HelmetProvider>
                <TextBalancerProvider>
                  {props.children}
                  <Notifications />
                </TextBalancerProvider>
              </HelmetProvider>
            </ActivityProvider>
          </TermsConditionsProvider>
        </VeridaProvider>
      </IntlProvider>
    </QueryProvider>
  );
};
