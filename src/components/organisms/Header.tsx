import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ReactComponent as VeridaNetworkLogo } from "~/assets/images/verida_network_logo.svg";
import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Button } from "~/components/atoms";
import { AvatarWithInfo } from "~/components/molecules";
import { useVerida } from "~/features/verida";

export const Header: React.FC = () => {
  const i18n = useIntl();
  const { connect, isConnected, profile, did } = useVerida();

  const handleConnect = useCallback(() => {
    void connect();
  }, [connect]);

  const connectButtonLabel = i18n.formatMessage({
    id: "Header.connectButtonLabel",
    description: "Label of the Connect button in the Header",
    defaultMessage: "Connect",
  });

  const contentHeight = "h-10";

  return (
    <header className="flex flex-row justify-between border-b border-solid border-gray-dark bg-translucent px-4 pt-3 pb-[calc(0.75rem_-_1px)] backdrop-blur-[15px] sm:px-6">
      <h1 className="justify-self-start">
        <Link to="/">
          <div className={`aspect-[10/6.97] ${contentHeight} sm:hidden`}>
            <VeridaNetworkLogo height="100%" width="100%" />
          </div>
          <div className={`hidden aspect-[10/3] ${contentHeight} sm:block`}>
            <VeridaNetworkLogoWithText height="100%" width="100%" />
          </div>
        </Link>
      </h1>
      <div className="flex items-center justify-between justify-self-end">
        {isConnected ? (
          <>
            <AvatarWithInfo
              did={did}
              image={profile?.avatarUri}
              name={profile?.name}
              className={`${contentHeight} -mr-4 sm:-mr-6 max-w-[220px]`}
            />
          </>
        ) : (
          <Button onClick={handleConnect} size="medium">
            {connectButtonLabel}
          </Button>
        )}
      </div>
    </header>
  );
};

/** Offset for the heigh of the Header */
export const HeaderOffset: React.FunctionComponent = () => {
  return <div className="h-16 w-full" />;
};
