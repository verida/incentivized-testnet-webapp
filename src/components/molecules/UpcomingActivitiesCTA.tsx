import React from "react";
import { useIntl } from "react-intl";

import { ButtonLink } from "~/components/atoms";
import { veridaSupportPlatforms } from "~/constants";

type UpcomingActivitiesCTAProps = React.ComponentPropsWithoutRef<"aside">;

export const UpcomingActivitiesCTA: React.FunctionComponent<
  UpcomingActivitiesCTAProps
> = (props) => {
  const { ...asideProps } = props;

  const i18n = useIntl();

  const discordLink = veridaSupportPlatforms.discord;

  const JoinDiscordMessage = i18n.formatMessage({
    id: "UpcomingActivitiesCTA.JoinDiscordMessage",
    defaultMessage: "Join our Discord to be informed of upcoming activities",
    description: "Message to display in the upcoming activities CTA",
  });

  return (
    <aside {...asideProps}>
      <div className="p-4 rounded-2xl bg-primary-5 flex flex-col gap-4 items-stretch">
        <p className="text-center">{JoinDiscordMessage}</p>
        <ButtonLink
          url={discordLink.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {discordLink.icon}
          <span>{discordLink.label}</span>
        </ButtonLink>
      </div>
    </aside>
  );
};
