import React from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { MissionIdLabelChip, Typography } from "~/components/atoms";
import { UpcomingActivitiesCTA } from "~/components/molecules";
import { ActivityCard } from "~/components/organisms";
import { config } from "~/config";
import type { Mission } from "~/features/activity";
import { useActivity } from "~/features/activity";

type MissionSectionProps = {
  mission: Mission;
} & React.ComponentPropsWithoutRef<"article">;

export const MissionSection: React.FunctionComponent<MissionSectionProps> = (
  props
) => {
  const { mission, ...articleProps } = props;

  const i18n = useIntl();
  const { activities: allActivities, getUserActivity } = useActivity();

  const activitiesSectionTitle = i18n.formatMessage({
    id: "MissionSection.activitiesSectionTitle",
    defaultMessage: "Activities",
    description: "Title for the activities section",
  });

  const comingSoonMessage = i18n.formatMessage({
    id: "MissionSection.comingSoonMessage",
    defaultMessage: "Coming Soon",
    description: "Message to display when a mission is not yet available",
  });

  const missionActivities = allActivities.filter(
    (activity) => activity.missionId === mission.id
  );

  const displayedActivities = missionActivities.filter((a) =>
    config.devMode ? true : a.visible
  );

  const hasUpcomingActivities =
    missionActivities.length > displayedActivities.length;

  const isMissionComingSoon =
    !mission.enabled || displayedActivities.length === 0;

  return (
    <article {...articleProps}>
      <div
        className={twMerge(
          "border border-solid border-border p-6 rounded-xl bg-mission-section backdrop-blur-4xl",
          isMissionComingSoon
            ? "text-muted-foreground border-dashed"
            : undefined
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <MissionIdLabelChip label={i18n.formatMessage(mission.idLabel)} />
            {isMissionComingSoon ? (
              <MissionIdLabelChip label={comingSoonMessage} />
            ) : null}
          </div>
          <Typography variant="heading-m">
            {i18n.formatMessage(mission.title)}
          </Typography>
          <Typography className="text-muted-foreground">
            {i18n.formatMessage(mission.shortDescription)}
          </Typography>
        </div>
        {isMissionComingSoon ? null : (
          <div>
            <Typography variant="heading-s" className="mt-8">
              {/* FIXME: Update style */}
              {activitiesSectionTitle}
            </Typography>
            <ul className="flex flex-col w-full gap-4 mt-4">
              {displayedActivities.map((activity, index) => (
                <li key={activity.id}>
                  <ActivityCard
                    index={index + 1} // So that the first activity is 1 instead of 0
                    activity={activity}
                    status={getUserActivity(activity.id)?.status || "todo"}
                  />
                </li>
              ))}
            </ul>
            {hasUpcomingActivities ? (
              <UpcomingActivitiesCTA
                index={displayedActivities.length + 1}
                className="mt-4"
              />
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
};
