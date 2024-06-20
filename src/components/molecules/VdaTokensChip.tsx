import { useIntl } from "react-intl";

import { Chip, Icon, Typography } from "~/components/atoms";

export type VdaTokensChipProps = {
  nbVdaTokens: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const VdaTokensChip: React.FC<VdaTokensChipProps> = (props) => {
  const { nbVdaTokens, ...divProps } = props;

  const i18n = useIntl();

  const formattedValue = i18n.formatMessage(
    {
      id: "VdaTokensChip.formattedValue",
      defaultMessage: `{nbVdaTokens} VDA`,
      description: "Formatted value of VDA tokens in the VDA tokens chip",
    },
    {
      nbVdaTokens: nbVdaTokens,
    }
  );

  return (
    <div {...divProps}>
      <Chip variant="primary" className="pl-1.5">
        <div className="flex flex-row gap-2 items-center">
          <Icon type="vda-token" size={24} />
          <Typography variant="subtitle" className="text-foreground">
            {formattedValue}
          </Typography>
        </div>
      </Chip>
    </div>
  );
};
