import { useIntl } from "react-intl";

import { Chip, Icon, Typography } from "~/components/atoms";

export type XpPointsChipProps = {
  nbXpPoints: number;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const XpPointsChip: React.FC<XpPointsChipProps> = (props) => {
  const { nbXpPoints, ...divProps } = props;

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
      <Chip variant="primary">
        <div className="flex flex-row gap-1.5 items-center">
          <Icon type="xp-points" size={20} />
          <Typography variant="subtitle" className="text-foreground">
            {formattedValue}
          </Typography>
        </div>
      </Chip>
    </div>
  );
};
