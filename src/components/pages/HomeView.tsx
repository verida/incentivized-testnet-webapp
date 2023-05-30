import React from "react";
import { useIntl } from "react-intl";

import { ReactComponent as VeridaNetworkLogo } from "~/assets/images/verida_network_logo_with_text.svg";

export const HomeView: React.FunctionComponent = () => {
  const i18n = useIntl();

  const comingSoonMessage = i18n.formatMessage({
    id: "HomeView.ComingSoon",
    description: "Message stating that the app will be available soon",
    defaultMessage: "Coming Soon",
  });

  const tagLineMessage = i18n.formatMessage({
    id: "HomeView.tagLineMessage",
    description: "Message stating that the app will be available soon",
    defaultMessage: "Participate, learn, test and get rewarded",
  });

  return (
    <div className="flex flex-grow flex-col items-center justify-center space-y-12 p-8">
      <div className="aspect-[10/3] w-full">
        <VeridaNetworkLogo height="100%" width="100%" />
      </div>
      <p className="text-xl md:text-4xl">{tagLineMessage}</p>
      <p className="text-xl md:text-4xl">{comingSoonMessage}</p>
    </div>
  );
};
