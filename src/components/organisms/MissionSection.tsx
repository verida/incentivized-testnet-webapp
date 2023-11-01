import React, { useEffect, useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import {
  ExternalLink,
  Icon,
  IconButton,
  MissionIdLabelChip,
  Typography,
} from "~/components/atoms";
import {
  MissionProgressBar,
  UpcomingActivitiesCTA,
} from "~/components/molecules";
import { ActivityCard } from "~/components/organisms";
import { config } from "~/config";
import type { Mission } from "~/features/activity";
import { useActivity } from "~/features/activity";
import { useVerida } from "~/features/verida";

export type MissionSectionProps = {
  mission: Mission;
} & React.ComponentPropsWithRef<"article">;

export const MissionSection: React.FunctionComponent<MissionSectionProps> = (
  props
) => {
  const { mission, ...articleProps } = props;
  const { title, shortDescription, longDescription, resources } = mission;

  const isInitialCollapseRef = useRef(true);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const i18n = useIntl();
  const { isConnected } = useVerida();
  const {
    activities: allActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

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

  const resourcesSectionTitle = i18n.formatMessage({
    id: "MissionSection.resourcesSectionTitle",
    description: "Title of the resources section in each mission section",
    defaultMessage: "Resources",
  });

  const toggleCollapseButtonLabel = i18n.formatMessage({
    id: "MissionSection.toggleCollapseButtonLabel",
    defaultMessage: "Toggle mission section",
    description: "Aria label for the button to toggle the mission section",
  });

  const missionActivities = allActivities.filter(
    (activity) => activity.missionId === mission.id
  );

  const displayedActivities = useMemo(() => {
    return missionActivities.filter((a) => (config.devMode ? true : a.visible));
  }, [missionActivities]);

  const activityStatuses = useMemo(() => {
    return displayedActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [displayedActivities, getUserActivity]);

  const isMissionComingSoon =
    !mission.enabled || displayedActivities.length === 0;

  // Set the initial collapse state. Wait for the user activities to be loaded before doing so. If all activities are completed, collapse the section.
  // Unfortunately, the latency before getting the user activities make the section starting as expanded and a few seconds later, may change the state depending on the check described above.
  useEffect(() => {
    if (isLoadingUserActivities || !isInitialCollapseRef.current) {
      return;
    }

    const hasIncompleteActivity = displayedActivities.some(
      (activity) => getUserActivity(activity.id)?.status !== "completed"
    );
    setIsCollapsed(!hasIncompleteActivity);
    isInitialCollapseRef.current = false;
  }, [isLoadingUserActivities, displayedActivities, getUserActivity]);

  return (
    <article {...articleProps}>
      <div id={mission.id} className="relative -top-24 h-0" />
      <div
        className={twMerge(
          "border border-solid border-border p-4 sm:p-6 rounded-xl bg-mission-section backdrop-blur-4xl flex flex-col gap-6",
          isMissionComingSoon
            ? "text-muted-foreground border-dashed"
            : undefined
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <MissionIdLabelChip label={i18n.formatMessage(mission.idLabel)} />
              {isMissionComingSoon ? (
                <MissionIdLabelChip label={comingSoonMessage} />
              ) : null}
            </div>

            <IconButton
              size="small"
              variant="text"
              aria-label={toggleCollapseButtonLabel}
              icon={
                <Icon
                  type={isCollapsed ? "chevron-down" : "chevron-up"}
                  size={20}
                  onClick={() => {
                    setIsCollapsed((prevState) => !prevState);
                  }}
                />
              }
            />
          </div>
          <Typography variant="heading-m">
            {i18n.formatMessage(title)}
          </Typography>
          {isCollapsed ? null : (
            <>
              <Typography className="text-muted-foreground">
                {i18n.formatMessage(
                  isConnected ? longDescription : shortDescription,
                  {
                    newline: (
                      <>
                        <br />
                      </>
                    ),
                  }
                )}
              </Typography>
              {resources && resources.length > 0 ? (
                <aside className="text-muted-foreground">
                  <Typography variant="subtitle">
                    {resourcesSectionTitle}
                  </Typography>
                  <ul>
                    {resources.map((resource, index) => (
                      <li key={index}>
                        <ExternalLink href={resource.url} openInNewTab>
                          {i18n.formatMessage(resource.label)}
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                </aside>
              ) : null}
            </>
          )}
        </div>
        {isCollapsed || isMissionComingSoon ? null : (
          <div>
            <Typography variant="heading-s">
              {/* FIXME: Update style */}
              {activitiesSectionTitle}
            </Typography>
            <ul className="flex flex-col w-full gap-4 mt-2">
              {displayedActivities.map((activity, index) => (
                <li key={activity.id}>
                  <ActivityCard
                    index={index + 1} // So that the first activity is 1 instead of 0
                    activity={activity}
                    userActivity={getUserActivity(activity.id)}
                  />
                </li>
              ))}
            </ul>
            {!mission.frozen ? (
              <UpcomingActivitiesCTA
                index={displayedActivities.length + 1}
                className="mt-4"
              />
            ) : null}
          </div>
        )}
        {!isConnected || isMissionComingSoon ? null : (
          <MissionProgressBar
            isLoading={isLoadingUserActivities}
            statuses={activityStatuses}
          />
        )}
      </div>
    </article>
  );
};
