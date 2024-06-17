import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { ComingSoonChip } from "~/components/molecules";

export type ComingSoonActivityItemProps = {
  activityIndex: number;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ComingSoonActivityItem: React.FC<ComingSoonActivityItemProps> = (
  props
) => {
  const { activityIndex, ...divProps } = props;
  const i18n = useIntl();
  const nextActivityText = i18n.formatMessage({
    id: "ComingSoonActivityItem.nextActivityText",
    description: "Default message of next activity text",
    defaultMessage: "Next Activity",
  });

  return (
    <div {...divProps}>
      <div className="flex flex-col lg:flex-row px-4 py-5 lg:p-6 rounded-xl border border-white/20 bg-transparent-6 hover:border-white/40 hover:bg-transparent-10 items-center cursor-pointer gap-4">
        <div className="flex items-center gap-3 lg:gap-4 w-full">
          <div
            className={
              "rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center text-desktop-base-s font-semibold bg-white/20 text-transparent-60"
            }
          >
            {activityIndex}
          </div>
          <Typography
            variant={"heading-s"}
            className="flex-1 text-nowrap overflow-ellipsis overflow-hidden text-transparent-60"
          >
            {nextActivityText}
          </Typography>
          <ComingSoonChip className="hidden lg:flex" />
        </div>
        <ComingSoonChip className="flex lg:hidden mr-auto" />
      </div>
    </div>
  );
};
