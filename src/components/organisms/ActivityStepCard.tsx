import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { TabbedCardBase, TabbedCardBaseProps } from "~/components/molecules";

export type ActivityStepCardProps = {
  index: number;
  step: string;
  theme?: "default" | "onboarding";
} & Omit<
  TabbedCardBaseProps,
  "children" | "label" | "accentColor" | "foregroundColor"
>;

export const ActivityStepCard: React.FC<ActivityStepCardProps> = (props) => {
  const { index, step, theme = "default", ...tabbedCardBaseProps } = props;

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
      accentColor={`hsl(var(${theme === "onboarding" ? "--onboarding-accent" : "--primary"}))`}
      foregroundColor="light"
      {...tabbedCardBaseProps}
    >
      <div className="px-4 py-6 md:p-6">
        <Typography variant="base">{step}</Typography>
      </div>
    </TabbedCardBase>
  );
};
