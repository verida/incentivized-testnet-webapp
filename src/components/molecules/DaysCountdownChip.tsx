import { useIntl } from "react-intl";

import { Chip, Icon, Typography } from "~/components/atoms";

export type DayCountdownChipProps = {
  nbDaysLeft: number; // TODO: To rename
} & Pick<React.ComponentPropsWithRef<typeof Chip>, "variant"> &
  Omit<React.ComponentPropsWithRef<"div">, "children">;

export const DaysCountdownChip: React.FC<DayCountdownChipProps> = (props) => {
  const { nbDaysLeft, variant, ...divProps } = props;

  const i18n = useIntl();

  const formattedValue = i18n.formatMessage(
    {
      id: "DaysCountdownChip.formattedValue",
      defaultMessage: `{nbDaysLeft, plural,
        one {{nbDaysLeft} day left}
        other {{nbDaysLeft} days left}
      }`,
      description:
        "Formatted value of days left in the activity days left chip",
    },
    {
      nbDaysLeft,
    }
  );

  return (
    <div {...divProps}>
      <Chip variant={variant}>
        <div className="flex flex-row gap-1.5 items-center">
          <Icon type="clock" size={20} />
          <Typography variant="subtitle" className="text-foreground">
            {formattedValue}
          </Typography>
        </div>
      </Chip>
    </div>
  );
};
