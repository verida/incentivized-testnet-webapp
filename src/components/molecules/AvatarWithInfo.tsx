import React from "react";

import { Avatar } from "~/components/atoms";
import { truncateDid } from "~/features/verida";

type AvatarWithInfoProps = {
  image?: string;
  name?: string;
  did?: string;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

export const AvatarWithInfo: React.FunctionComponent<AvatarWithInfoProps> = (
  props
) => {
  const { did, name, image, ...divProps } = props;

  const formattedName = name || "<Anon>";

  return (
    <div {...divProps}>
      <div className="h-full flex flex-row gap-2 bg-primary-15 rounded-s-full pr-4 md:pr-2">
        <Avatar image={image} alt={name} className="h-full flex-shrink-0" />
        <div className="hidden md:flex flex-col justify-between py-0.5 flex-shrink truncate">
          <p
            className={`truncate text-base leading-5 font-semibold ${
              name === undefined ? "italic" : ""
            }`}
          >
            {formattedName}
          </p>
          {did === undefined ? null : (
            <p className="truncate text-sm leading-3.5 text-primary/70">
              {truncateDid(did)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
