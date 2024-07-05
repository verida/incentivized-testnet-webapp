export type StackedDivProps = {
  divs: React.ReactElement[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const StackedDiv: React.FC<StackedDivProps> = (props) => {
  const { divs, ...divProps } = props;

  return (
    <div {...divProps}>
      <div className="flex flex-row">
        {divs.map((_div, index) => (
          <div key={index} className={index > 0 ? "-ml-3" : undefined}>
            {_div}
          </div>
        ))}
      </div>
    </div>
  );
};
