import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

export type StackedDivProps = {
  divs: React.ReactElement[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const StackedDiv: React.FC<StackedDivProps> = (props) => {
  const { divs, className, ...divProps } = props;
  const i18n = useIntl();

  return (
    <div className={twMerge("flex", className)} {...divProps}>
      {divs.map((_div, index) => (
        <div key={index} className={index > 0 ? "-ml-3" : "ml-0"}>
          {_div}
        </div>
      ))}
    </div>
  );
};
