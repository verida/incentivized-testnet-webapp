import React from "react";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";

export type TabbedCardBaseProps = {
  label: string;
  backgroundColor: string;
  foregroundColor?: "dark" | "light";
} & React.ComponentPropsWithRef<"div">;

export const TabbedCardBase: React.FC<TabbedCardBaseProps> = (props) => {
  const {
    label,
    backgroundColor,
    foregroundColor = "light",
    className,
    children,
    ...divProps
  } = props;

  return (
    <div className={twMerge("relative", className)} {...divProps}>
      <div
        className="absolute bottom-[calc(100%_-_1px)] pb-px left-0 rounded-t-lg"
        // bottom-[calc(100%_-_1px)] and pb-px is to ensure there is no gap
        // with the div below
        style={{
          backgroundColor,
        }}
      >
        <div className="px-4 py-1">
          <Typography
            variant="base-s"
            className={
              foregroundColor === "light"
                ? "text-foreground"
                : "text-background"
            }
          >
            {label}
          </Typography>
        </div>
      </div>
      <div
        className="rounded-xl rounded-tl-none p-px backdrop-blur-0"
        // Use the backdrop to hide the above div underneath this one, which
        // allow us to avoid a z index
        style={{
          background: `linear-gradient(135deg, ${backgroundColor} 10%, hsla(var(--white) / 0.15) 90%)`,
        }}
      >
        <div
          className="px-4 py-6 md:p-6 rounded-[calc(0.75rem_-_1px)] flex flex-col gap-6"
          // rounded-[calc(0.75rem_-_1px)] to have a constant border of 1px
          // with the surrounding div
          style={{
            background:
              "linear-gradient(135deg, hsla(var(--black) / 0.7) 10%, hsla(var(--background) / 1) 90%)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
