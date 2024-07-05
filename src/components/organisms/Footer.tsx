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

  const builtOnLabel = i18n.formatMessage({
    id: "Footer.builtOnLabel",
    defaultMessage: "Built on",
    description: "label of the 'built on' text in the footer section",
  });

  const conditionsWillApplyMessage = i18n.formatMessage({
    id: "Footer.conditionsWillApplyMessage",
    defaultMessage: "Eligibility conditions and terms of use apply",
    description:
      "Message stating that conditions will apply when using the app",
  });

  const copyrightYear = `${new Date().getFullYear()}`;
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
      className={twMerge("border-t border-solid border-divider", className)}
    >
      <div className="p-6 flex flex-col items-center  sm:flex-row gap-4 text-muted-foreground">
        <div className="flex flex-col justify-center sm:order-2 px-8">
          <ExternalLink
            href={VERIDA_NETWORK_URL}
            openInNewTab
            className="flex flex-col items-center no-underline hover:underline"
          >
            <Typography
              variant="base-s"
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
        <div className="sm:order-3 sm:flex-1 sm:text-right">
          <Typography variant="base-s" component="span">
            {conditionsWillApplyMessage}
          </Typography>
        </div>
        <div className="sm:order-1 sm:flex-1">
          <Typography variant="base-s" component="span">
            {copyrightMessage}
          </Typography>
        </div>
      </div>
    </footer>
  );
};
