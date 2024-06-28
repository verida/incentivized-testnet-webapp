import React, { Children, useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Button, Icon, Typography } from "~/components/atoms";

export type CollapsibleListProps = {
  nbItemWhenCollapsed?: number;
  listClassName?: React.ComponentPropsWithRef<"ul">["className"];
} & React.ComponentPropsWithRef<"div">;

export const CollapsibleList: React.FC<CollapsibleListProps> = (props) => {
  const {
    nbItemWhenCollapsed = 3,
    children,
    listClassName,
    ...divProps
  } = props;

  const items = useMemo(() => Children.toArray(children), [children]);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = useCallback(() => setIsCollapsed((prev) => !prev), []);

  const i18n = useIntl();

  const viewAllButtonLabel = i18n.formatMessage({
    id: "CollapsibleList.viewAllButtonLabel",
    description:
      "Label of the button to display all items of a collapsible list",
    defaultMessage: "View All",
  });

  const collapseButtonLabel = i18n.formatMessage({
    id: "CollapsibleList.collapseButtonLabel",
    description:
      "Label of the button to collapse the items of a collapsible list",
    defaultMessage: "Collapse",
  });

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-5">
        <ul className={twMerge("flex flex-col gap-6", listClassName)}>
          {isCollapsed ? items.slice(0, nbItemWhenCollapsed) : children}
        </ul>
        {items.length > nbItemWhenCollapsed ? (
          <Button
            variant="text"
            onClick={toggleCollapse}
            className="self-center"
          >
            <Typography variant="subtitle">
              {isCollapsed ? viewAllButtonLabel : collapseButtonLabel}
            </Typography>
            <Icon
              type={isCollapsed ? "chevron-down" : "chevron-up"}
              size={20}
            />
          </Button>
        ) : null}
      </div>
    </div>
  );
};
