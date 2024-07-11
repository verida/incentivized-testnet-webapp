import React from "react";
import { useIntl } from "react-intl";

import { Icon, Typography } from "~/components/atoms";

export type AirdropCheckStatusModalContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

export const AirdropCheckStatusModalContent: React.FC<
  AirdropCheckStatusModalContentProps
> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const checkingStatusMessage = i18n.formatMessage({
    id: "AirdropCheckStatusModalContent.checkingStatusMessage",
    defaultMessage: "Checking the status of your airdrop",
    description:
      "Message displayed in the airdrop modal when checking the status of the airdrop",
  });

  const pleaseWaitMessage = i18n.formatMessage({
    id: "AirdropCheckStatusModalContent.pleaseWaitMessage",
    defaultMessage: "Please wait a moment...",
    description:
      "Message displayed in the airdrop modal when checking the status of the airdrop",
  });

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-8 items-center">
        <Typography variant="base">{checkingStatusMessage}</Typography>
        <Icon type="loading" size={60} className="animate-spin-slow" />
        <Typography variant="base" className="text-muted-foreground">
          {pleaseWaitMessage}
        </Typography>
      </div>
    </div>
  );
};
