import React from "react";
import { useIntl } from "react-intl";
import { Outlet } from "react-router-dom";

import { Typography } from "~/components/atoms";
import { AirdropCard } from "~/components/organisms/AirdropCard";
import { PageLayout } from "~/components/templates";
import { airdrops } from "~/features/airdrops";

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

  return (
    <>
      <PageLayout
        hideBackButton
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
          <ul className="flex flex-col gap-10">
            {airdrops.map((airdrop) => (
              <li key={airdrop.id}>
                <article>
                  <AirdropCard airdrop={airdrop} />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </PageLayout>
      <Outlet />
    </>
  );
};
