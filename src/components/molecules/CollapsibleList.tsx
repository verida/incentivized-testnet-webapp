import React, { Children, useState } from "react";
import { useIntl } from "react-intl";

import { Icon, Typography } from "~/components/atoms";

export type CollapsibleListProps = {
  limit?: number;
} & React.ComponentPropsWithRef<"ul">;

export const CollapsibleList: React.FC<CollapsibleListProps> = (props) => {
  const { limit = 3, children, ...ulProps } = props;

  const i18n = useIntl();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const viewAllLabel = i18n.formatMessage({
    id: "CollapsibleList.viewAllLabel",
    description: "Label View All",
    defaultMessage: "View All",
  });

  const collapseLabel = i18n.formatMessage({
    id: "CollapsibleList.collapseLabel",
    description: "Label Collapse",
    defaultMessage: "Collapse",
  });

  const items = Children.toArray(children);

  return (
    <div>
      <ul {...ulProps}>{isCollapsed ? items.slice(0, limit) : children}</ul>
      {items.length > limit ? (
        <div
          className="flex justify-center gap-2 mt-8 hover:cursor-pointer"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <Typography variant={"base-s"}>
            {isCollapsed ? viewAllLabel : collapseLabel}
          </Typography>
          <Icon type={isCollapsed ? "chevron-down" : "chevron-up"} size={20} />
        </div>
      ) : null}
    </div>
  );
};
