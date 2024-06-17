import { useIntl } from "react-intl";

import { Chip, Icon, Typography } from "~/components/atoms";

export type ActivityDaysLeftChipProps = {
  nbDaysLeft: number; // TODO: To rename
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityDaysLeftChip: React.FC<ActivityDaysLeftChipProps> = (
  props
) => {
  const { nbDaysLeft, ...divProps } = props;

  const i18n = useIntl();

  const formattedValue = i18n.formatMessage(
    {
      id: "ActivityDaysLeftChip.formattedValue",
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
      <Chip variant="default">
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
