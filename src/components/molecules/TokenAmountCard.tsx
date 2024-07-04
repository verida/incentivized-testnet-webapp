import React from "react";

import { Typography } from "~/components/atoms";

export type TokenAmountCardProps = {
  title?: string;
  amount?: number;
} & Omit<React.ComponentProps<"div">, "children">;

export const TokenAmountCard: React.FC<TokenAmountCardProps> = (props) => {
  const { amount, title, ...divProps } = props;

  return (
    <div {...divProps}>
      <div className="border border-border rounded-xl bg-clip-padding bg-gradient-to-br from-primary/30 to-black/30 p-4 flex flex-col items-start gap-3">
        {title ? (
          <Typography variant="heading-s" component="p">
            {title}
          </Typography>
        ) : null}
        <Typography variant="heading-m" component="p">
          {String(amount ?? "-")}
        </Typography>
      </div>
    </div>
  );
};
