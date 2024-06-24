import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { MissionCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { missions } from "~/features/missions";

export const MissionsPage: React.FC = () => {
  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "MissionsPage.title",
    description: "Title of the Missions page",
    defaultMessage: "Missions",
  });

  return (
    <PageLayout title={title}>
      <ul className="grid gap-4 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {missions.map((mission) => (
          <li key={mission.id}>
            <Link to={`/missions/${mission.id}`}>
              <MissionCard
                mission={mission}
                className="h-full hover:border-border-hover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
};
