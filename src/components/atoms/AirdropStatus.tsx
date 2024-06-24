import React from "react";
import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms/Icon";
import { Typography } from "~/components/atoms/Typography";
import {
  AirdropStatus as AirdropStatusType,
  AirdropUserStatus as AirdropUserStatusType,
} from "~/features/airdrops";

export type AirdropStatusProps = {
  airdropStatus: AirdropStatusType;
  userStatus: AirdropUserStatusType;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const AirdropStatus: React.FC<AirdropStatusProps> = (props) => {
  const { airdropStatus, userStatus, ...divProps } = props;

  const i18n = useIntl();

  const checkingStatusMessage = i18n.formatMessage({
    id: "AirdropStatus.checkingStatusMessage",
    defaultMessage: "Checking",
    description: "Message displayed when checking the airdrop user's status",
  });

  const registeredStatusMessage = i18n.formatMessage({
    id: "AirdropStatus.registeredStatusMessage",
    defaultMessage: "Registered",
    description:
      "Message displayed when the user is registered for the airdrop",
  });

  const claimedStatusMessage = i18n.formatMessage({
    id: "AirdropStatus.claimedStatusMessage",
    defaultMessage: "Claimed",
    description: "Message displayed when the user has claimed the airdrop",
  });

  const closedStatusMessage = i18n.formatMessage({
    id: "AirdropStatus.closedStatusMessage",
    defaultMessage: "Closed",
    description: "Message displayed when the user has claimed the airdrop",
  });

  return (
    <div {...divProps}>
      {userStatus === "loading" ? (
        <div className="text-foreground bg-transparent-5 px-6 py-2.5 rounded-xl flex flex-row gap-2">
          <Icon type="loading" size={20} className="animate-spin-slow" />
          <Typography>{checkingStatusMessage}</Typography>
        </div>
      ) : userStatus === "claimed" ? (
        <div className="text-success bg-success-background px-6 py-2.5 rounded-xl flex flex-row gap-2 justify-center">
          <Icon type="check" size={20} />
          <Typography variant="subtitle">{claimedStatusMessage}</Typography>
        </div>
      ) : userStatus === "registered" && airdropStatus !== "claim-closed" ? (
        <div className="text-success bg-success-background px-6 py-2.5 rounded-xl flex flex-row gap-2 justify-center">
          <Icon type="check" size={20} />
          <Typography variant="subtitle">{registeredStatusMessage}</Typography>
        </div>
      ) : (
        <div className="text-foreground bg-transparent-5 px-6 py-2.5 rounded-xl flex flex-row gap-2 justify-center">
          <Icon type="close-outline" size={20} />
          <Typography variant="subtitle">{closedStatusMessage}</Typography>
        </div>
      )}
    </div>
  );
};
