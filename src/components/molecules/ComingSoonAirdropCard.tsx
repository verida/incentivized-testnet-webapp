import React from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";
import { AirdropCardBase } from "~/components/molecules/AirdropCardBase";

export type ComingSoonAirdropCardProps = {
  title: string;
} & Omit<
  React.ComponentProps<typeof AirdropCardBase>,
  "topContent" | "bottomContent"
>;

export const ComingSoonAirdropCard: React.FC<ComingSoonAirdropCardProps> = (
  props
) => {
  const { title, className, ...airdropCardBaseProps } = props;

  const i18n = useIntl();

  const comingSoonMessage = i18n.formatMessage({
    id: "ComingSoonAirdropCard.comingSoon",
    description: "Coming soon message",
    defaultMessage: "Coming Soon",
  });

  return (
    <AirdropCardBase
      {...airdropCardBaseProps}
      className={twMerge("opacity-60", className)}
      topContent={<Typography variant="heading-m">{title}</Typography>}
      bottomContent={
        <Typography variant="base" className="text-muted-foreground">
          {comingSoonMessage}
        </Typography>
      }
    />
  );
};
