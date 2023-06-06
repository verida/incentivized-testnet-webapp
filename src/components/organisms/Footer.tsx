import { ReactComponent as VeridaNetworkLogo } from "assets/images/verida_network_logo_with_text_white.svg";
import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { VERIDA_NETWORK_URL } from "~/constants";

export const Footer: React.FunctionComponent = () => {
  const i18n = useIntl();
  const copyrightYear = `${new Date().getFullYear()}`;

  const builtOnLabel = i18n.formatMessage({
    id: "Footer.builtOnLabel",
    defaultMessage: "Built on",
    description: "label of the 'built on' text in the footer section",
  });

  const termsAndConditionLinkLabel = i18n.formatMessage({
    id: "Footer.termsAndConditionLinkLabel",
    defaultMessage: "Terms of Use",
    description:
      "Label of the 'Terms and Condition' Link in the footer section",
  });

  const copyrightMessage = i18n.formatMessage(
    {
      id: "Footer.copyrightMessage",
      defaultMessage: "© {copyrightYear} Verida Network",
      description: "Copyright message in the footer section",
    },
    { copyrightYear }
  );

  return (
    <footer className="flex flex-col items-center justify-center space-y-3 border-t border-solid border-gray-dark py-4 px-6 text-primary sm:flex-row sm:justify-between">
      <div className="flex flex-col justify-center sm:order-2">
        <a
          className="flex flex-col items-center"
          href={VERIDA_NETWORK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mb-1 place-content-center text-center">
            {builtOnLabel}
          </span>
          <div className="aspect-[9/3] h-6">
            <VeridaNetworkLogo height="100%" width="100%" />
          </div>
        </a>
      </div>
      <div className="sm:order-3 sm:flex-1">
        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0">
          <Link to="/terms-and-conditions" className="hover:underline">
            {termsAndConditionLinkLabel}
          </Link>
        </div>
      </div>
      <div className="sm:order-1 sm:flex-1">
        <span>{copyrightMessage}</span>
      </div>
    </footer>
  );
};
