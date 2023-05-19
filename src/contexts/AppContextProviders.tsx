import React from "react";
import { VeridaProvider } from "features/verida";

type AppContextProvidersProps = {
  children: React.ReactNode;
};

export const AppContextProviders: React.FunctionComponent<
  AppContextProvidersProps
> = (props) => {
  const { children } = props;

  return <VeridaProvider>{children}</VeridaProvider>;
};
