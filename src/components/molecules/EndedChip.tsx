import { useIntl } from "react-intl";

import { Chip, Typography } from "~/components/atoms";

export type EndedChipProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
>;

export const EndedChip: React.FC<EndedChipProps> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const formattedValue = i18n.formatMessage({
    id: "EndedChip.formattedValue",
    defaultMessage: `Ended`,
    description: "Formatted value of Ended chip",
  });

  return (
    <div {...divProps}>
      <Chip variant="ended">
        <div className="flex flex-row gap-1.5 items-center">
          <Typography variant="subtitle">{formattedValue}</Typography>
        </div>
      </Chip>
    </div>
  );
};
