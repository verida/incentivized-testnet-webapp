import { ReactComponent as VeridaNetworkLogo } from "assets/images/verida_network_logo_with_text_white.svg";
import React from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ExternalLink, Typography } from "~/components/atoms";
import { VERIDA_NETWORK_URL } from "~/constants";

export type FooterProps = Omit<
  React.ComponentPropsWithRef<"footer">,
  "children"
>;

export const Footer: React.FC<FooterProps> = (props) => {
  const { className, ...footerProps } = props;

  const i18n = useIntl();
  const copyrightYear = `${new Date().getFullYear()}`;

  const builtOnLabel = i18n.formatMessage({
    id: "Footer.builtOnLabel",
    defaultMessage: "Built on",
    description: "label of the 'built on' text in the footer section",
  });

  // const termsAndConditionLinkLabel = i18n.formatMessage({
  //   id: "Footer.termsAndConditionLinkLabel",
  //   defaultMessage: "Terms of Use",
  //   description:
  //     "Label of the 'Terms and Condition' Link in the footer section",
  // });

  const conditionsWillApplyMessage = i18n.formatMessage({
    id: "Footer.conditionsWillApplyMessage",
    defaultMessage: "Eligibility conditions and terms of use will apply",
    description:
      "Message stating that conditions will apply when using the app",
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
    <footer
      {...footerProps}
      className={twMerge(
        "flex flex-col items-center justify-center space-y-3 border-t border-solid border-divider py-4 px-6 sm:flex-row sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col justify-center sm:order-2">
        <ExternalLink
          href={VERIDA_NETWORK_URL}
          openInNewTab
          className="flex flex-col items-center no-underline hover:underline text-muted-foreground"
        >
          <Typography
            component="span"
            className="mb-1 place-content-center text-center"
          >
            {builtOnLabel}
          </Typography>
          <div className="aspect-[9/3] h-6">
            <VeridaNetworkLogo height="100%" width="100%" />
          </div>
        </ExternalLink>
      </div>
      <div className="sm:order-3 sm:flex-1">
        <div className="flex flex-col items-center space-y-3 sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0">
          {/* <Link to="/terms-and-conditions" className="hover:underline">
            {termsAndConditionLinkLabel}
          </Link> */}
          <Typography className="text-center text-xs">
            {conditionsWillApplyMessage}
          </Typography>
        </div>
      </div>
      <div className="sm:order-1 sm:flex-1">
        <Typography component="span">{copyrightMessage}</Typography>
      </div>
    </footer>
  );
};
