import React from "react";
import { HelmetProvider } from "react-helmet-async";

import { ActivityProvider } from "~/features/activities";
import { IntlProvider } from "~/features/i18n";
import { VeridaProvider } from "~/features/verida";

type AppContextProvidersProps = {
  children: React.ReactNode;
};

export const AppContextProviders: React.FunctionComponent<
  AppContextProvidersProps
> = (props) => {
  return (
    <IntlProvider>
      <VeridaProvider>
        <ActivityProvider>
          <HelmetProvider>{props.children}</HelmetProvider>
        </ActivityProvider>
      </VeridaProvider>
    </IntlProvider>
  );
};
