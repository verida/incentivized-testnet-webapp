import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { MissionCard, PartnerInfoCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { usePartner } from "~/features/partners";

export const PartnerPage: React.FC = () => {
  const { partnerId = "" } = useParams();
  const { partner, activities, missions } = usePartner(partnerId);

  const i18n = useIntl();

  // TODO: Rework the not found state of the Partner page
  const emptry = i18n.formatMessage({
    id: "PartnerPage.empty",
    description: "Description",
    defaultMessage: "No data",
  });

  // TODO: Implement the case there is no missions to display

  return (
    <PageLayout
      title={partner?.title ? i18n.formatMessage(partner?.title) : undefined}
    >
      {partner ? (
        <div className="flex flex-col justify-start lg:flex-row gap-10">
          <PartnerInfoCard
            partner={partner}
            nbActivities={activities.length}
            className="max-lg:w-full"
          />
          <ul className={"flex-grow grid grid-cols-1 gap-8"}>
            {missions.map((mission) => (
              <li key={mission.id}>
                <article>
                  <MissionCard
                    mission={mission}
                    activities={activities.filter(
                      // TODO: To optimise if this component is used elsewhere.
                      // Activities are a fixed constant, this filter can be done
                      // in the Mission card itself.In this  particular case, it
                      // should only be the activities of a given partner, so this
                      // MissionCard could take an optional partnerId prop to
                      // filter the activities.
                      (activity) => activity.missionId === mission.id
                    )}
                  />
                </article>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="">{emptry}</div>
      )}
    </PageLayout>
  );
};
