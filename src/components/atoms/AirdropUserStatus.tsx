import React from "react";
import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms/Icon";
import { Typography } from "~/components/atoms/Typography";
import { AirdropUserStatus as AirdropUserStatusType } from "~/features/airdrops";

export type AirdropUserStatusProps = {
  status: AirdropUserStatusType;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const AirdropUserStatus: React.FC<AirdropUserStatusProps> = (props) => {
  const { status, ...divProps } = props;

  const i18n = useIntl();

  const registeredStatusMessage = i18n.formatMessage({
    id: "AirdropUserStatus.registeredStatusMessage",
    defaultMessage: "Registered",
    description:
      "Message displayed when the user is registered for the airdrop",
  });

  const checkingStatusMessage = i18n.formatMessage({
    id: "AirdropUserStatus.checkingStatusMessage",
    defaultMessage: "Checking",
    description: "Message displayed when checking the airdrop user's status",
  });

  return (
    <div {...divProps}>
      {status === "checking" ? (
        <div className="text-foreground bg-transparent-15 px-6 py-2.5 rounded-xl flex flex-row gap-2">
          <Icon type="loading" size={20} className="animate-spin-slow" />
          <Typography>{checkingStatusMessage}</Typography>
        </div>
      ) : null}
      {status === "registered" ? (
        <div className="text-success bg-success-background px-6 py-2.5 rounded-xl flex flex-row gap-2 justify-center">
          <Icon type="check" size={20} />
          <Typography variant="subtitle">{registeredStatusMessage}</Typography>
        </div>
      ) : null}
    </div>
  );
};
