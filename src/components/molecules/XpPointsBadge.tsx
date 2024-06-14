import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";

export type XpPointsBadgeProps = {
  nbXpPoints: number;
  theme?: "RED" | "BLUE";
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const XpPointsBadge: React.FC<XpPointsBadgeProps> = (props) => {
  const { nbXpPoints, theme, className, ...divProps } = props;
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
    <div
      className={twMerge(
        "relative flex justify-center w-40 h-40",
        theme === "BLUE" ? "bg-xp-badge-blue" : "bg-xp-badge",
        className
      )}
      {...divProps}
    >
      <div className="absolute w-full h-full flex justify-center items-center">
        <Typography variant={"heading-s"}>{formattedValue}</Typography>
      </div>
    </div>
  );
};
