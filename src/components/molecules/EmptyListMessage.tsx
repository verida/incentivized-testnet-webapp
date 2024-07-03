import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";

export type EmptyListMessageProps = {
  logo?: React.ReactNode;
  entity: MessageDescriptor;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const EmptyListMessage: React.FC<EmptyListMessageProps> = (props) => {
  const { logo, entity, className, ...divProps } = props;

  const i18n = useIntl();

  const emptyListMessage = i18n.formatMessage(
    {
      id: "EmptyListMessage.emptyListMessage",
      description: "Message when there are no entities",
      defaultMessage: "There are currently no {entity} to display",
    },
    { entity: i18n.formatMessage(entity) }
  );

  const emptyListDescription = i18n.formatMessage(
    {
      id: "EmptyListMessage.emptyListDescription",
      description: "Description when there are no entities",
      defaultMessage:
        "It looks like there are no {entity} available at the moment. Please check back later.",
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
      <Typography variant="heading-m">{emptyListMessage}</Typography>
      <Typography>{emptyListDescription}</Typography>
    </div>
  );
};
