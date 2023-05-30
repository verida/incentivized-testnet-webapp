import React from "react";
import { HelmetProvider } from "react-helmet-async";

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
        <HelmetProvider>{props.children}</HelmetProvider>
      </VeridaProvider>
    </IntlProvider>
  );
};
