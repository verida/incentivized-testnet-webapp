import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ReactComponent as VeridaNetworkLogo } from "~/assets/images/verida_network_logo.svg";
import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Button } from "~/components/atoms";

export const Header: React.FC = () => {
  const i18n = useIntl();

  const connectButtonLabel = i18n.formatMessage({
    id: "Header.connectButtonLabel",
    description: "Label of the Connect button in the Header",
    defaultMessage: "Connect",
  });

  return (
    <header className="grid grid-cols-[minmax(165px,_1fr)_minmax(min-content,696px)_minmax(165px,_1fr)] border-b border-solid border-gray-dark bg-background/80 px-4 pt-3 pb-[calc(0.75rem_-_1px)] backdrop-blur-[10px] sm:px-6">
      <h1 className="col-start-1 justify-self-start">
        <Link to="/">
          <div className="aspect-[10/6.97] h-10 sm:hidden">
            <VeridaNetworkLogo height="100%" width="100%" />
          </div>
          <div className="hidden aspect-[10/3] h-10 sm:block">
            <VeridaNetworkLogoWithText height="100%" width="100%" />
          </div>
        </Link>
      </h1>
      <div className="flex sm:col-auto sm:col-start-2 sm:block sm:max-w-screen-sm sm:px-4"></div>
      <div className="col-start-3 flex items-center justify-between justify-self-end">
        {/* <Button size="medium">{connectButtonLabel}</Button> */}
      </div>
    </header>
  );
};

/** Offset for the heigh of the Header */
export const HeaderOffset: React.FunctionComponent = () => {
  return <div className="h-16 w-full" />;
};
