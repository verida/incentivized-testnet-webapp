import React from "react";

export type AirdropCardBaseProps = {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  accentColor?: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const AirdropCardBase: React.FC<AirdropCardBaseProps> = (props) => {
  const {
    topContent,
    bottomContent,
    accentColor = "#19193D",
    ...divProps
  } = props;

  return (
    <div {...divProps}>
      <div className="bg-background rounded-3xl">
        <div className="border border-border rounded-3xl p-1 bg-gradient-to-br from-transparent-8 to-transparent-3 shadow-[12px_24px_40px_0px_rgba(0,0,0,0.15)] flex flex-col">
          <div
            className="rounded-[1.25rem] px-4 py-6 shadow-[0px_3px_4px_1px_rgba(0,0,0,0.15)_inset]"
            style={{
              background: `linear-gradient(290deg, hsla(var(--black) / 0.30) 20%, ${accentColor} 90%)`,
            }}
          >
            {topContent}
          </div>
          <div className="px-4 py-5">{bottomContent}</div>
        </div>
      </div>
    </div>
  );
};
