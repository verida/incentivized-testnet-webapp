import { EnvironmentType } from "@verida/types";
import React from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Typography } from "~/components/atoms";
import { config } from "~/config";
import {
  VERIDA_MISSIONS_MAINNET_URL,
  VERIDA_MISSIONS_TESTNET_URL,
  VERIDA_WALLET_DOWNLOAD_URL,
} from "~/constants";

export type HomeHeroProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
>;

export const HomeHero: React.FunctionComponent<HomeHeroProps> = (props) => {
  const i18n = useIntl();

  const descriptionPart1 = i18n.formatMessage(
    {
      id: "HomeHero.descriptionPart1",
      description: "Description (part 1) of Verida Missions",
      defaultMessage:
        "Take control over your own personal data. Join Verida Missions, build up your XP, and earn storage credits for secure data management on Verida Network.",
    },
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const newUserCta = i18n.formatMessage({
    id: "HomeHero.newUserCta",
    description: "CTA for new users",
    defaultMessage: "Download the Verida Wallet",
  });

  const newUserMessage = i18n.formatMessage({
    id: "HomeHero.newUserMessage",
    description: "Message for new users",
    defaultMessage:
      ", create your Identity and connect to Verida Missions to get started.",
  });

  const existingUserTitle = i18n.formatMessage({
    id: "HomeHero.existingUserTitle",
    description: "Title for existing users",
    defaultMessage: "Testnet users: Make the move to Mainnet!",
  });

  const existingUserMessage = i18n.formatMessage({
    id: "HomeHero.existingUserMessage",
    description: "Message for existing users",
    defaultMessage:
      "Update your Verida Wallet to migrate your completed activities and XP to Mainnet.",
  });

  const testnetMissionsLinkLabel = i18n.formatMessage({
    id: "HomeHero.testnetMissionsLinkLabel",
    description: "Label for link to Verida Missions on Testnet",
    defaultMessage: "Go back to Verida Missions on Testnet",
  });

  const nonMainnetWarning = i18n.formatMessage({
    id: "HomeHero.nonMainnetWarning",
    description: "Warning for non-mainnet environments",
    defaultMessage: "This is a Testnet version of Verida Missions.",
  });

  const mainnetMissionsLinkLabel = i18n.formatMessage({
    id: "HomeHero.mainnetMissionsLinkLabel",
    description: "Label for link to Verida Missions on Mainnet",
    defaultMessage: "Visit the Mainnet version",
  });

  return (
    <div {...props}>
      <div className="flex flex-grow flex-col items-center justify-center text-center gap-2 text-muted-foreground px-0 sm:px-16">
        <Typography>{descriptionPart1}</Typography>
        <Typography>
          <ExternalLink href={VERIDA_WALLET_DOWNLOAD_URL} openInNewTab>
            {newUserCta}
          </ExternalLink>
          {newUserMessage}
        </Typography>
        {config.verida.environment === EnvironmentType.MAINNET ? (
          <>
            <Typography variant="heading-s" className="mt-4">
              {existingUserTitle}
            </Typography>
            <Typography>
              {existingUserMessage}
              <ExternalLink href={VERIDA_MISSIONS_TESTNET_URL} className="ml-1">
                {testnetMissionsLinkLabel}
              </ExternalLink>
            </Typography>
          </>
        ) : (
          <Typography>
            {nonMainnetWarning}
            <ExternalLink href={VERIDA_MISSIONS_MAINNET_URL} className="ml-1">
              {mainnetMissionsLinkLabel}
            </ExternalLink>
          </Typography>
        )}
      </div>
    </div>
  );
};
