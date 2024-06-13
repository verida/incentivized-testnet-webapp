import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms";

export type PointCardProps = {
  points: number;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

// TODO: Rename to ActivityXpPointsChip or something like this. Also it is not a card, not everything is a card!
export const PointCard: React.FC<PointCardProps> = (props) => {
  const { points, ...divProps } = props;

  const i18n = useIntl();

  const xpText = i18n.formatMessage({
    id: "partner.mission.info.activity.xp",
    defaultMessage: `${points} XP`, // FIXME: This doesn't work, it should be a variable
    description: "Description message of XP",
  });

  return (
    <div {...divProps}>
      <div className="flex rounded-badge h-fit py-1.5 px-3 gap-2 border border-border-component bg-pointBg items-center">
        <Icon type="xp-points" size={20} />
        <span className="flex text-base font-semibold text-nowrap">
          {xpText}
        </span>
      </div>
    </div>
  );
};
