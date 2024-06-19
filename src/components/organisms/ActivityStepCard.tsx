import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";

export type ActivityStepCardProps = {
  index: number;
  step: string;
  isOnboardingActivity?: boolean;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityStepCard: React.FC<ActivityStepCardProps> = (props) => {
  const { index, step, isOnboardingActivity = false, ...divProps } = props;

  const i18n = useIntl();

  const stepLabel = i18n.formatMessage(
    {
      id: "ActivityPage.stepLabel",
      defaultMessage: "Step {index}",
      description: "Label above the activity step card",
    },
    {
      index: index + 1,
    }
  );

  const gradient = isOnboardingActivity
    ? "linear-gradient(129deg, hsl(var(--card-2-grad-1)) 1.09%, hsl(var(--background)) 98.84%)"
    : "linear-gradient(129deg, hsl(var(--card-1-grad-1)) 1.09%, hsl(var(--card-1-grad-2)) 98.84%)";

  return (
    <div className="relative" {...divProps}>
      <div
        className={twMerge(
          "absolute bottom-[calc(100%_-_1px)] pb-px left-0 rounded-t-lg px-4 py-1",
          isOnboardingActivity ? "bg-stepCard2Banner" : "bg-stepCard1Banner"
        )}
      >
        <Typography variant="base-s">{stepLabel}</Typography>
      </div>
      <div
        className={twMerge(
          "rounded-xl rounded-tl-none p-px backdrop-blur-0",
          isOnboardingActivity ? "bg-stepCard2Banner" : "bg-stepCard1Banner"
        )}
      >
        <div
          className="px-4 py-6 md:p-6 rounded-[calc(0.75rem_-_1px)]"
          style={{
            background: gradient,
          }}
        >
          <Typography variant={"heading-s"}>{step}</Typography>
        </div>
      </div>
    </div>
  );
};
