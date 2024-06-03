import React from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ReactComponent as BackIcon } from "~/assets/icons/arrow-left.svg";

type ButtonProps = React.ComponentPropsWithRef<"button">;

export const BackButton: React.FunctionComponent<ButtonProps> = (props) => {
  const { className, ...btnProps } = props;
  const navigate = useNavigate();
  return (
    <button
      {...btnProps}
      className={twMerge(
        "w-10 h-10 flex justify-center items-center p-[10px] bg-backButtonBackground rounded-[12px] border border-white/10 font-bold cursor-pointer backdrop-blur-[4.5px] opacity-50 hover:opacity-100",
        className
      )}
      onClick={() => navigate(-1)}
    >
      <BackIcon />
    </button>
  );
};
