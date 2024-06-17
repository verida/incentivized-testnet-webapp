import { useIntl } from "react-intl";

import { Chip, Typography } from "~/components/atoms";

export type ComingSoonChipProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
>;

export const ComingSoonChip: React.FC<ComingSoonChipProps> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const formattedValue = i18n.formatMessage({
    id: "ComingSoonChip.formattedValue",
    defaultMessage: `Coming Soon`,
    description: "Formatted value of ComingSoon chip",
  });

  return (
    <div {...divProps}>
      <Chip variant="muted">
        <div className="flex flex-row gap-1.5 items-center">
          <Typography variant="subtitle" className="text-muted-foreground">
            {formattedValue}
          </Typography>
        </div>
      </Chip>
    </div>
  );
};
