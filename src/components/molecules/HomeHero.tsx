import React from "react";
import { useIntl } from "react-intl";

import { ExternalLink, Typography } from "~/components/atoms";
import { VERIDA_WALLET_DOWNLOAD_URL } from "~/constants";

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
        "Begin your journey towards having control over your own data and personal information with Verida Missions.{newline}{newline}Complete the activities, build up your XP, and earn storage credits for the secure data management on Verida Network.",
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
      "Verida Missions is now using the Verida Mainnet. Update your Verida Wallet to start the process for migrating to Mainnet, and ensure your completed activities and XP are transferred to Verida Missions.",
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
        <Typography variant="heading-s" className="mt-4">
          {existingUserTitle}
        </Typography>
        <Typography>{existingUserMessage}</Typography>
      </div>
    </div>
  );
};
