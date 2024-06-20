import React from "react";
import { useIntl } from "react-intl";

import { Button, ButtonLink, Typography } from "~/components/atoms";
import { VdaTokensChip } from "~/components/molecules";
import { AirdropDefinition } from "~/features/airdrops";

export type AirdropCardProps = {
  airdrop: AirdropDefinition;
  onActionClick: () => void;
  actionButtonLabel: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const AirdropCard: React.FC<AirdropCardProps> = (props) => {
  const { airdrop, actionButtonLabel, onActionClick, ...divProps } = props;

  const i18n = useIntl();

  const airdropResourceLabel = i18n.formatMessage(airdrop.resource.label);

  return (
    <div {...divProps}>
      <div className="bg-background rounded-3xl">
        <div className="border border-border rounded-3xl p-1 bg-gradient-to-br from-transparent-8 to-transparent-3 shadow-[12px_24px_40px_0px_rgba(0,0,0,0.16)] flex flex-col">
          <div className="rounded-[1.25rem] px-4 py-6 bg-gradient-to-br from-primary/20 to-black/50 shadow-[0px_3px_4px_1px_rgba(0,0,0,0.15)_inset] flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Typography variant="heading-m">
                {i18n.formatMessage(airdrop.longTitle)}
              </Typography>
              <VdaTokensChip nbVdaTokens={airdrop.vdaAllocation} />
            </div>
            <Typography>{i18n.formatMessage(airdrop.description)}</Typography>
          </div>
          <div className="px-4 py-5 flex flex-col sm:flex-row sm:justify-end gap-6">
            <Button
              variant="contained"
              color="primary"
              className="w-full sm:w-fit"
              onClick={onActionClick}
            >
              {actionButtonLabel}
            </Button>
            <ButtonLink
              href={airdrop.resource.url}
              openInNewTab
              variant="contained"
              color="secondary"
              className="w-full sm:w-fit"
            >
              {airdropResourceLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};
