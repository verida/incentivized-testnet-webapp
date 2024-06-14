import { useIntl } from "react-intl";

import { ReactComponent as BgBlueXP } from "~/assets/images/blue-point-bg.svg";
import { ReactComponent as BgXP } from "~/assets/images/point-bg.svg";
import { Typography } from "~/components/atoms";

export type XpPointsBadgeProps = {
  nbXpPoints: number;
  theme?: "RED" | "BLUE";
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const XpPointsBadge: React.FC<XpPointsBadgeProps> = (props) => {
  const { nbXpPoints, theme, ...divProps } = props;
  const i18n = useIntl();
  const formattedValue = i18n.formatMessage(
    {
      id: "XpPointsChip.formattedValue",
      defaultMessage: `{xpPoints} XP`,
      description: "Formatted value of XP points in the XP points chip",
    },
    {
      xpPoints: nbXpPoints,
    }
  );
  return (
    <div className={"relative flex justify-center h-fit w-full"} {...divProps}>
      {theme === "BLUE" ? (
        <BgBlueXP className="flex" />
      ) : (
        <BgXP className="flex" />
      )}
      <div className="absolute w-full h-full flex justify-center items-center">
        <Typography variant={"heading-s"}>{formattedValue}</Typography>
      </div>
    </div>
  );
};
