import React from "react";
import { useIntl } from "react-intl";
import { Outlet } from "react-router-dom";

import AboutAirdropsImage from "~/assets/images/vda_airdrop_illustration.png";
import { ButtonLink, Typography } from "~/components/atoms";
import { AirdropCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import {
  AIRDROPS_COMMON_QUESTIONS,
  AIRDROPS_FAQ_URL,
  airdrops,
} from "~/features/airdrops";

export const AirdropsPage: React.FC = () => {
  const i18n = useIntl();

  const title = i18n.formatMessage(
    {
      id: "AirdropsPage.title",
      description: "Title of the Airdrops page",
      defaultMessage: "Verida{newline}Airdrops",
    },
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  const tagline = i18n.formatMessage({
    id: "AirdropsPage.tagline",
    description: "Tag line displayed at the top of the Airdrops page",
    defaultMessage:
      " This program is intended to reward early adopters to the network and encourage newcomers to discover Verida's features and capabilities.",
  });

  const aboutAirdropsSectionTitle = i18n.formatMessage({
    id: "AirdropsPage.aboutAirdropsSectionTitle",
    description: "Title of the section about airdrops in the airdrops page",
    defaultMessage: "About Airdrops",
  });

  const aboutAirdropsMessage = i18n.formatMessage(
    {
      id: "AirdropsPage.aboutAirdropsMessage",
      description: "Message in the section about airdrops in the airdrops page",
      defaultMessage:
        "The Verida Foundation has committed to giving 20% of the total initial token supply to the community through its Network Growth Rewards.{newline}{newline}Airdrops target constructive participation — ensuring that tokens go to contributors. Note that past airdrop eligibility criteria do not guarantee eligibility in future airdrops.",
    },
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );

  // const commonQuestionsSectionTitle = i18n.formatMessage({
  //   id: "AirdropsPage.commonQuestionsSectionTitle",
  //   description: "Title of the section common questions in the airdrops page",
  //   defaultMessage: "Common Questions",
  // });

  const faqButtonLabel = i18n.formatMessage({
    id: "AirdropsPage.faqButtonLabel",
    description: "Label for the FAQ button in the airdrops page",
    defaultMessage: "Read FAQ",
  });

  return (
    <>
      <PageLayout
        hideBackButton
        displayGetSupportSection
        displayLearnMoreSection
        containerClassName="bg-homepage"
        contentClassName="max-w-screen-sm sm:px-4 pt-4"
      >
        <div className="flex flex-col gap-11">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-4 items-center max-w-96 mt-24">
              <Typography variant="heading-l">
                {/* Had to surround by div because of style conflict with Typography, likely 'text-transparent' */}
                <div className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 px-8 sm:px-14 text-center">
                  {title}
                </div>
              </Typography>
              <Typography className="text-center">{tagline}</Typography>
            </div>
          </div>
          <div className="flex flex-col gap-28">
            <ul className="flex flex-col gap-10">
              {airdrops.map((airdrop) => (
                <li key={airdrop.id}>
                  <article>
                    <AirdropCard airdrop={airdrop} />
                  </article>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 items-center">
              <img src={AboutAirdropsImage} alt="" className="h-40" />
              <Typography
                variant="heading-l"
                component="p"
                className="text-center"
              >
                {aboutAirdropsSectionTitle}
              </Typography>
              <Typography
                variant="base"
                className="text-muted-foreground text-center"
              >
                {aboutAirdropsMessage}
              </Typography>
            </div>
            <div className="flex flex-col gap-4 items-center">
              {/* <Typography
                variant="heading-l"
                component="p"
                className="text-center"
              >
                {commonQuestionsSectionTitle}
              </Typography> */}
              <div className="flex flex-col gap-6">
                {AIRDROPS_COMMON_QUESTIONS.map((question, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <Typography variant="heading-s" component="p">
                      {i18n.formatMessage(question.question)}
                    </Typography>
                    <Typography className="text-muted-foreground">
                      {i18n.formatMessage(question.answer, {
                        newline: (
                          <>
                            <br />
                          </>
                        ),
                      })}
                    </Typography>
                  </div>
                ))}
              </div>
              <ButtonLink
                href={AIRDROPS_FAQ_URL}
                variant="contained"
                color="primary"
                openInNewTab
              >
                {faqButtonLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </PageLayout>
      <Outlet />
    </>
  );
};
