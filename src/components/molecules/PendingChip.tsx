import { useIntl } from "react-intl";

import { Chip, Icon, Typography } from "~/components/atoms";

export type PendingChipProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
>;

export const PendingChip: React.FC<PendingChipProps> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const formattedValue = i18n.formatMessage({
    id: "PendingChip.formattedValue",
    defaultMessage: `Pending`,
    description: "Formatted value of Pending chip",
  });

  return (
    <div {...divProps}>
      <Chip variant="pending">
        <div className="flex flex-row gap-1.5 items-center">
          <Icon type="loading" size={20} className="text-warning" />
          <Typography variant="subtitle" className="text-warning">
            {formattedValue}
          </Typography>
        </div>
      </Chip>
    </div>
  );
};
