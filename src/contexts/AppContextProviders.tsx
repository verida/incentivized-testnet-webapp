import React from "react";
import { HelmetProvider } from "react-helmet-async";

import { ActivityProvider } from "~/features/activity";
import { IntlProvider } from "~/features/i18n";
import { MainnetUpgradeProvider } from "~/features/mainnetUpgrade";
import { Notifications } from "~/features/notifications";
import { RewardsProvider } from "~/features/rewards";
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
        <MainnetUpgradeProvider>
          <VeridaProvider>
            <TermsConditionsProvider>
              <ActivityProvider>
                <RewardsProvider>
                  <HelmetProvider>
                    {props.children}
                    <Notifications />
                  </HelmetProvider>
                </RewardsProvider>
              </ActivityProvider>
            </TermsConditionsProvider>
          </VeridaProvider>
        </MainnetUpgradeProvider>
      </IntlProvider>
    </QueryProvider>
  );
};
