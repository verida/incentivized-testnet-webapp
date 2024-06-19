import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";

export type ActivityStepCardProps = {
  index: number;
  step: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityStepCard: React.FC<ActivityStepCardProps> = (props) => {
  const { index, step, ...divProps } = props;

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

  return (
    <div className="relative" {...divProps}>
      <div className="bg-[#733BD6] absolute bottom-[calc(100%_-_1px)] pb-px left-0 rounded-t-lg px-4 py-1">
        <Typography variant="base-s">{stepLabel}</Typography>
      </div>
      <div className="bg-[#733BD6] rounded-xl rounded-tl-none p-px backdrop-blur-0">
        <div
          className="px-4 py-6 md:p-6 rounded-[calc(0.75rem_-_1px)]"
          style={{
            background: `linear-gradient(129deg, #2C1356 1.09%, #19193D 98.84%)`,
          }}
        >
          <Typography variant={"heading-s"}>{step}</Typography>
        </div>
      </div>
    </div>
  );
};
