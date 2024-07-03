import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";

export type NotFoundMessageProps = {
  logo?: React.ReactNode;
  entity: MessageDescriptor;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const NotFoundMessage: React.FC<NotFoundMessageProps> = (props) => {
  const { logo, entity, className, ...divProps } = props;

  const i18n = useIntl();

  const notFoundMessage = i18n.formatMessage(
    {
      id: "NotFoundMessage.notFoundMessage",
      description: "Message when entity doesn't exist",
      defaultMessage: "{entity} Not Found",
    },
    { entity: i18n.formatMessage(entity) }
  );

  const notFoundDescription = i18n.formatMessage(
    {
      id: "NotFoundMessage.notFoundDescription",
      description: "Description when entity doesn't exist",
      defaultMessage:
        "The {entity} ID you entered does not match any existing {entity}. Please check the {entity} ID and try again.",
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
      {logo ? (
        <div className="flex flex-row items-center w-50 h-50 sm:w-60 sm:h-60">
          {logo}
        </div>
      ) : null}
      <Typography variant="heading-m">{notFoundMessage}</Typography>
      <Typography>{notFoundDescription}</Typography>
    </div>
  );
};
