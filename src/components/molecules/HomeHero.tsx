import React from "react";
import { useIntl } from "react-intl";

import { APP_TITLE } from "~/constants";

type HomeHeroProps = Omit<React.ComponentPropsWithoutRef<"div">, "children">;

export const HomeHero: React.FunctionComponent<HomeHeroProps> = (props) => {
  const i18n = useIntl();

  const subtitle = i18n.formatMessage({
    id: "HomeHero.subtitle",
    description: "Subtitle or tag line displayed in the hero section",
    defaultMessage: "Participate, learn, test and get rewarded",
  });

  const descriptionPart1 = i18n.formatMessage({
    id: "HomeHero.descriptionPart1",
    description:
      "Description (part 1) of the Verida incentivized testnet program",
    defaultMessage:
      "The purpose of Verida Missions incentivized testnet is to stress-test network infrastructure, Verida applications and prepare storage node operations for the Verida mainnet.",
  });
  const descriptionPart2 = i18n.formatMessage({
    id: "HomeHero.descriptionPart2",
    description:
      "Description (part 2) of the Verida incentivized testnet program",
    defaultMessage:
      "By undertaking the following activities, you'll play a vital role in preparing the Verida network for mainnet.",
  });
  const descriptionPart3 = i18n.formatMessage({
    id: "HomeHero.descriptionPart3",
    description:
      "Description (part 3) of the Verida incentivized testnet program",
    defaultMessage:
      "More missions will be released throughout the program. Get started now with the first mission below.",
  });
  const descriptionPart4 = i18n.formatMessage({
    id: "HomeHero.descriptionPart4",
    description:
      "Description (part 4) of the Verida incentivized testnet program",
    defaultMessage:
      "Are you ready to ignite your journey? The countdown to the Verida mainnet begins now!",
  });

  return (
    <div {...props}>
      <div className="flex flex-grow flex-col items-center justify-center text-center">
        <h1 className="text-sm sm:text-base font-bold text-purple uppercase">
          {APP_TITLE}
        </h1>
        <p className="text-4xl sm:text-5xl font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/70">
          {subtitle}
        </p>
        <p className="text-sm mt-4">{descriptionPart1}</p>
        <p className="text-sm mt-2">{descriptionPart2}</p>
        <p className="text-sm mt-2">{descriptionPart3}</p>
        <p className="text-sm mt-2">{descriptionPart4}</p>
      </div>
    </div>
  );
};
