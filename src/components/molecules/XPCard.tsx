import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ReactComponent as BgBlueXP } from "~/assets/images/blue-point-bg.svg";
import { ReactComponent as BgXP } from "~/assets/images/point-bg.svg";
// import bgXP from "~/assets/images/bg_xp.png";
import { Typography } from "~/components/atoms";

export const XPCard = ({
  point,
  classNames,
  theme,
}: {
  point: number;
  classNames?: string;
  theme?: "RED" | "BLUE";
}) => {
  const i18n = useIntl();
  const xpText = i18n.formatMessage({
    id: "xpcard.xplabel",
    description: "Description of xp label",
    defaultMessage: `${point} XP`,
  });
  return (
    <div
      className={twMerge(
        "relative flex justify-center h-fit w-full",
        classNames
      )}
    >
      {theme === "BLUE" ? <BgBlueXP /> : <BgXP />}
      <div className="absolute w-full h-full flex justify-center items-center">
        <Typography className="!font-bold !text-point-title">
          {xpText}
        </Typography>
      </div>
    </div>
  );
};
