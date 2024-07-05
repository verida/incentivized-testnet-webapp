import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ReactComponent as VeridaNetworkLogo } from "~/assets/images/verida_network_logo_with_text_white.svg";
import { Typography } from "~/components/atoms";

export type NotFoundMessageProps = {
  logo?: React.ReactNode | null;
  entity: MessageDescriptor;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const NotFoundMessage: React.FC<NotFoundMessageProps> = (props) => {
  const { logo, entity, className, ...divProps } = props;

  const i18n = useIntl();

  const notFoundMessage = i18n.formatMessage(
    {
      id: "NotFoundMessage.notFoundMessage",
      description: "Message when entity doesn't exist",
      defaultMessage: "{entity} not found",
    },
    { entity: i18n.formatMessage(entity) }
  );

  const notFoundDescription = i18n.formatMessage(
    {
      id: "NotFoundMessage.notFoundDescription",
      description: "Description when entity doesn't exist",
      defaultMessage: "The {entity} you're looking for hasn't been found.",
    },
    { entity: i18n.formatMessage(entity) }
  );

  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-4 max-w-screen-sm text-center",
        className
      )}
      {...divProps}
    >
      {logo || logo === undefined ? (
        <div className="flex flex-row items-center w-50 sm:w-60">
          {logo || <VeridaNetworkLogo />}
        </div>
      ) : null}
      <Typography variant="heading-m" className="capitalize">
        {notFoundMessage}
      </Typography>
      <Typography variant="base" className="text-muted-foreground">
        {notFoundDescription}
      </Typography>
    </div>
  );
};
