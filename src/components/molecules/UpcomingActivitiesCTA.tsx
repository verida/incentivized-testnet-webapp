import React from "react";
import { useIntl } from "react-intl";

import { ActivityIndex, ButtonLink, Typography } from "~/components/atoms";
import { veridaSupportPlatforms } from "~/constants";

export type UpcomingActivitiesCTAProps = {
  index: number;
} & React.ComponentPropsWithRef<"aside">;

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
      <div className="p-3 sm:p-4 rounded-xl bg-transparent-3 flex flex-col gap-3 sm:gap-4 items-stretch border border-dashed border-border text-muted-foreground">
        <header className="flex flex-col gap-3 items-start justify-center sm:justify-start sm:flex-row sm:gap-4 sm:items-center">
          <ActivityIndex index={String(index)} />
          <Typography component="p" variant="heading-s" className="italic">
            {title}
          </Typography>
        </header>
        <div>
          <Typography className="italic">{JoinDiscordMessage}</Typography>
        </div>
        <footer>
          <ButtonLink href={discordLink.url} openInNewTab className="w-full">
            {discordLink.icon}
            <span>{discordLink.label}</span>
          </ButtonLink>
        </footer>
      </div>
    </aside>
  );
};
