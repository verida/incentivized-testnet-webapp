import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { TabbedCardBase } from "~/components/molecules";

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
      index: index,
    }
  );

  return (
    <TabbedCardBase
      label={stepLabel}
      accentColor={`hsl(var(${isOnboardingActivity ? "--card-2-background" : "--card-1-background"}))`}
      foregroundColor="light"
      {...divProps}
    >
      <div className="px-4 py-6 md:p-6">
        <Typography variant={"base"}>{step}</Typography>
      </div>
    </TabbedCardBase>
  );
};
