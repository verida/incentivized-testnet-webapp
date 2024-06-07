import { useIntl } from "react-intl";

export const TimeleftCard = ({ left_days }: { left_days: number }) => {
  const i18n = useIntl();
  const altText = i18n.formatMessage({
    id: "timer.alt",
    defaultMessage: "alt-timer",
    description: "Alt message of timer",
  });
  const timeRemainingText = i18n.formatMessage({
    id: "timer.text",
    defaultMessage: `${left_days} days left`,
    description: "Description message of timer",
  });
  return (
    <div className="rounded-badge h-fit py-1.5 px-3 gap-2 border border-white/20 bg-white/10 items-center hidden">
      <img src="/images/ic_clock.png" alt={altText} className="w-5 h-5" />
      <span className="flex text-base font-semibold text-nowrap">
        {timeRemainingText}
      </span>
    </div>
  );
};
