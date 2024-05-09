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
  useAirdrop2,
} from "~/features/airdrops";
import { useVerida } from "~/features/verida";

export const HomePage: React.FunctionComponent = () => {
  const i18n = useIntl();
  const { isConnected } = useVerida();
  const { missions } = useActivity();
  const {
    metadata: airdrop1Metadata,
    isEnabled: isAirdrop1Enabled,
    openModal: openAirdrop1Modal,
  } = useAirdrop1();
  const {
    isProofSubmitted: isAirdrop1ProofSubmitted,
    isCheckingProofSubmitted: isCheckingAirdrop1ProofSubmitted,
  } = useAirdrop1Queries();
  const {
    metadata: airdrop2Metadata,
    isEnabled: isAirdrop2Enabled,
    openModal: openAirdrop2Modal,
  } = useAirdrop2();

  const tagline = i18n.formatMessage({
    id: "HomePage.tagline",
    description: "Tag line displayed at the top of the Home page",
    defaultMessage: "Explore a new era of data ownership",
  });

  const airdrop1AlertMessage = i18n.formatMessage(
    {
      id: "HomePage.airdrop1AlertMessage",
      defaultMessage: "Prove your eligibility for the {airdropTitle}",
      description: "Message for the airdrop 1 alert on the home page",
    },
    {
      airdropTitle: i18n.formatMessage(airdrop1Metadata.longTitle),
    }
  );

  const airdrop1AlertProveActionButtonLabel = i18n.formatMessage({
    id: "HomePage.airdrop1AlertProveActionButtonLabel",
    defaultMessage: "Prove",
    description:
      "Label for the airdrop 1 'Prove' alert button on the home page",
  });

  const airdrop1AlertLearnActionButtonLabel = i18n.formatMessage({
    id: "HomePage.airdrop1AlertLearnActionButtonLabel",
    defaultMessage: "Learn more",
    description:
      "Label for the airdrop 1 'Learn more' alert button on the home page",
  });

  const airdrop2AlertMessage = i18n.formatMessage(
    {
      id: "HomePage.airdrop2AlertMessage",
      defaultMessage: "Check your eligibility for the {airdropTitle}",
      description: "Message for the airdrop 2 alert on the home page",
    },
    {
      airdropTitle: i18n.formatMessage(airdrop2Metadata.longTitle),
    }
  );

  const airdrop2AlertCheckActionButtonLabel = i18n.formatMessage({
    id: "HomePage.airdrop2AlertCheckActionButtonLabel",
    defaultMessage: "Check",
    description:
      "Label for the airdrop 2 'Check' alert button on the home page",
  });

  const airdrop2AlertLearnActionButtonLabel = i18n.formatMessage({
    id: "HomePage.airdrop2AlertLearnActionButtonLabel",
    defaultMessage: "Learn more",
    description:
      "Label for the airdrop 2 'Learn more' alert button on the home page",
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
      {isAirdrop2Enabled && isConnected && (
        <Alert
          type="info"
          actions={[
            {
              type: "button",
              label: airdrop2AlertCheckActionButtonLabel,
              onClick: openAirdrop2Modal,
            },
            {
              type: "link",
              label: airdrop2AlertLearnActionButtonLabel,
              href: AIRDROPS_FAQ_URL,
              openInNewTab: true,
              color: "default",
            },
          ]}
          message={airdrop2AlertMessage}
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
