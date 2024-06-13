import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ReactComponent as BgPoint } from "~/assets/images/bg_point.svg";
import bgXP from "~/assets/images/bg_xp.png";

import { Typography } from "../atoms";

export const XPCard = ({
  point,
  classNames,
}: {
  point: number;
  classNames?: string;
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
      <img src={bgXP} alt="" className="h-40 w-auto" />
      {/* <BgPoint width={160} height={160} /> */}
      <div className="absolute w-full h-full flex justify-center items-center">
        <Typography className="!font-bold !text-point-title">
          {xpText}
        </Typography>
      </div>
    </div>
  );
};
