import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";

export function MissionActivityComingSoonCard({ no }: { no: number }) {
  const i18n = useIntl();
  const nextActivityText = i18n.formatMessage({
    id: "MissionActivityComingSoonCard.nextActivityText",
    description: "Default message of next activity text",
    defaultMessage: "Next Activity",
  });
  const comingSoonText = i18n.formatMessage({
    id: "MissionActivityComingSoonCard.comingSoonText",
    description: "Default message of coming soon text",
    defaultMessage: "Coming Soon",
  });
  return (
    <div className="flex flex-col lg:flex-row px-4 py-5 lg:p-6 rounded-xl border border-white/20 bg-transparent-6 hover:border-white/40 hover:bg-transparent-10 items-center cursor-pointer gap-4">
      <div className="flex items-center gap-3 lg:gap-4 w-full">
        <div
          className={
            "rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center text-desktop-base-s font-semibold bg-white/20 text-transparent-60"
          }
        >
          {no}
        </div>
        <Typography
          component={"h5"}
          className="!text-heading-s flex-1 text-nowrap overflow-ellipsis overflow-hidden text-transparent-60"
        >
          {nextActivityText}
        </Typography>
        <div className="hidden lg:flex rounded-badge h-fit py-1.5 px-3 gap-2 border border-transparent-40 items-center">
          <Typography
            component={"span"}
            className="flex !text-base !font-semibold text-nowrap !text-transparent-70"
          >
            {comingSoonText}
          </Typography>
        </div>
      </div>
      <div className="flex lg:hidden rounded-badge h-fit py-1.5 px-3 gap-2 border border-transparent-40 items-center justify-start mr-auto">
        <Typography
          component={"span"}
          className="flex !text-base !font-semibold text-nowrap !text-transparent-70"
        >
          {comingSoonText}
        </Typography>
      </div>
    </div>
  );
}
