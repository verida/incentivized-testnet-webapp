import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";

export type XpPointsBadgeProps = {
  nbXpPoints: number;
  theme?: "default" | "onboarding";
  textClassName?: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const XpPointsBadge: React.FC<XpPointsBadgeProps> = (props) => {
  const { nbXpPoints, theme = "default", textClassName, ...divProps } = props;

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
    <div {...divProps}>
      <div
        className={twMerge(
          "flex flex-row justify-center items-center w-full aspect-square",
          theme === "onboarding"
            ? "bg-xp-badge-onboarding"
            : "bg-xp-badge-default"
        )}
      >
        <Typography
          variant="heading-s"
          component="span"
          className={textClassName}
        >
          {formattedValue}
        </Typography>
      </div>
    </div>
  );
};
