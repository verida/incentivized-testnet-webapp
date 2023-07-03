import React from "react";
import { useIntl } from "react-intl";

import { ActivityIndex, ButtonLink, Typography } from "~/components/atoms";
import { veridaSupportPlatforms } from "~/constants";

type UpcomingActivitiesCTAProps = {
  index: number;
} & React.ComponentPropsWithoutRef<"aside">;

export const UpcomingActivitiesCTA: React.FunctionComponent<
  UpcomingActivitiesCTAProps
> = (props) => {
  const { index, ...asideProps } = props;

  const i18n = useIntl();

  const discordLink = veridaSupportPlatforms.discord;

  const title = i18n.formatMessage({
    id: "UpcomingActivitiesCTA.title",
    defaultMessage: "Next activity coming soon",
    description: "Message to display in the upcoming activities CTA",
  });

  const JoinDiscordMessage = i18n.formatMessage({
    id: "UpcomingActivitiesCTA.JoinDiscordMessage",
    defaultMessage:
      "Join Verida's Discord community for updates on new activities and missions.",
    description: "Message to display in the upcoming activities CTA",
  });

  return (
    <aside {...asideProps}>
      <div className="p-4 rounded-2xl bg-transparent-3 flex flex-col gap-4 items-stretch border border-dashed border-border">
        <header className="flex flex-row gap-4 items-baseline text-muted-foreground">
          <ActivityIndex index={String(index)} />
          <Typography component="p" variant="heading-s" className="italic">
            {title}
          </Typography>
        </header>
        <div className="text-muted-foreground">
          <Typography className="italic">{JoinDiscordMessage}</Typography>
        </div>
        <footer className="w-full">
          <ButtonLink
            url={discordLink.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {discordLink.icon}
            <span>{discordLink.label}</span>
          </ButtonLink>
        </footer>
      </div>
    </aside>
  );
};
