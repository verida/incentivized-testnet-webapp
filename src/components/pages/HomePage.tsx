import React from "react";
import { useIntl } from "react-intl";

import { Alert, HomeHero } from "~/components/molecules";
import {
  ConnectVeridaButton,
  MissionSection,
  MissionsSideNavigation,
} from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { useActivity } from "~/features/activity";
import {
  AIRDROPS_FAQ_URL,
  useAirdrop1,
  useAirdrop1Queries,
} from "~/features/airdrops";
import { useVerida } from "~/features/verida";

export const HomePage: React.FunctionComponent = () => {
  const i18n = useIntl();
  const { isConnected } = useVerida();
  const { missions } = useActivity();
  const { isEnabled: isAirdrop1Enabled, openModal: openAirdrop1Modal } =
    useAirdrop1();
  const {
    isProofSubmitted: isAirdrop1ProofSubmitted,
    isCheckingProofSubmitted: isCheckingAirdrop1ProofSubmitted,
  } = useAirdrop1Queries();

  const tagline = i18n.formatMessage({
    id: "HomePage.tagline",
    description: "Tag line displayed at the top of the Home page",
    defaultMessage: "Explore a new era of data ownership",
  });

  const airdrop1AlertMessage = i18n.formatMessage({
    id: "HomePage.airdrop1AlertMessage",
    defaultMessage: "Prove your eligibility for the Early Adopters Airdrop",
    description: "Message for the airdrop alert on the home page",
  });

  const airdrop1AlertProveActionButtonLabel = i18n.formatMessage({
    id: "HomePage.airdrop1AlertProveActionButtonLabel",
    defaultMessage: "Prove",
    description: "Label for the airdrop 'Prove' alert button on the home page",
  });

  const airdrop1AlertLearnActionButtonLabel = i18n.formatMessage({
    id: "HomePage.airdrop1AlertLearnActionButtonLabel",
    defaultMessage: "Learn more",
    description:
      "Label for the airdrop 'Learn more' alert button on the home page",
  });

  return (
    <PageLayout title={tagline}>
      <HomeHero className="mt-4" />
      {isConnected ? null : (
        <div className="mt-6 flex justify-center">
          <ConnectVeridaButton longLabel />
        </div>
      )}
      {isAirdrop1Enabled &&
        isConnected &&
        !isAirdrop1ProofSubmitted &&
        !isCheckingAirdrop1ProofSubmitted && (
          <Alert
            type="info"
            actions={[
              {
                type: "button",
                label: airdrop1AlertProveActionButtonLabel,
                onClick: openAirdrop1Modal,
              },
              {
                type: "link",
                label: airdrop1AlertLearnActionButtonLabel,
                href: AIRDROPS_FAQ_URL,
                openInNewTab: true,
                color: "default",
              },
            ]}
            message={airdrop1AlertMessage}
            className="mt-6"
          />
        )}
      <div className="mt-16 relative">
        <div className="hidden lg:block absolute top-0 bottom-0 -right-6 translate-x-full w-36 xl:w-64">
          <aside className="sticky top-24">
            <MissionsSideNavigation />
          </aside>
        </div>
        {missions.map((mission) => (
          <MissionSection
            key={mission.id}
            mission={mission}
            className="mt-16"
          />
        ))}
      </div>
    </PageLayout>
  );
};
