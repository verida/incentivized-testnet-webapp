/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from "react";

import { HomeHero } from "~/components/molecules";
import { ActivityCard } from "~/components/organisms";
import { useActivity } from "~/features/activities";

export const HomeView: React.FunctionComponent = () => {
  const { activities, userActivities } = useActivity();

  return (
    <div>
      <HomeHero />
      <div className="mt-6">
        <h3 className="text-2xl font-bold">Activities</h3>
        <ul className="flex flex-col w-full gap-4 mt-4">
          {activities.sort().map((activity, index) => (
            <li key={activity.id}>
              <ActivityCard
                index={index + 1}
                activity={activity}
                status={userActivities.get(activity.id)?.status || "todo"}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
