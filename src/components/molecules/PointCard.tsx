import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";

export const PointCard = ({ point }: { point: number }) => {
  const i18n = useIntl();
  const altText = i18n.formatMessage({
    id: "partner.mission.info.activity.alt",
    defaultMessage: "alt-star",
    description: "Alt message of image",
  });

  const xpText = i18n.formatMessage({
    id: "partner.mission.info.activity.xp",
    defaultMessage: `${point} XP`,
    description: "Description message of XP",
  });
  return (
    <div className="flex rounded-badge h-fit py-1.5 px-3 gap-2 border border-border-component bg-pointBg items-center">
      <img src="/images/point-star.png" alt={altText} className="w-5 h-5" />
      <Typography
        component={"span"}
        className="flex !text-base !font-semibold text-nowrap"
      >
        {xpText}
      </Typography>
    </div>
  );
};
