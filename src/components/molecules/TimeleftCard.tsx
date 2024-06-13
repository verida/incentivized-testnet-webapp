import { useIntl } from "react-intl";

export type TimeleftCardProps = {
  leftDays: number; // TODO: To rename
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

// TODO: Find a better name for this component: ActivitySomething at least. Also it is not a card, not everything is a card!
export const TimeleftCard: React.FC<TimeleftCardProps> = (props) => {
  const { leftDays, ...divProps } = props;

  const i18n = useIntl();

  // TODO: To rework
  const altText = i18n.formatMessage({
    id: "timer.alt",
    defaultMessage: "alt-timer",
    description: "Alt message of timer",
  });

  const timeRemainingText = i18n.formatMessage({
    id: "timer.text",
    defaultMessage: `${leftDays} days left`, // FIXME: This doesn't work, it should be a variable
    description: "Description message of timer",
  });

  return (
    <div {...divProps}>
      <div className="rounded-badge h-fit py-1.5 px-3 gap-2 border border-white/20 bg-white/10 items-center hidden">
        <img src="/images/ic_clock.png" alt={altText} className="w-5 h-5" />
        <span className="flex text-base font-semibold text-nowrap">
          {timeRemainingText}
        </span>
      </div>
    </div>
  );
};
