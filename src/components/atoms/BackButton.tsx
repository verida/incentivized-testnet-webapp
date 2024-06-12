import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Icon, IconButton } from "~/components/atoms";

export type BackButtonProps = Omit<
  React.ComponentPropsWithRef<typeof IconButton>,
  "variant" | "icon" | "color" | "onClick"
>;

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const { className, ...iconButtonProps } = props;

  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <IconButton
      {...iconButtonProps}
      variant="outlined"
      color="default"
      className={twMerge("backdrop-blur-sm", className)}
      icon={<Icon type="arrow-left" size={18} />}
      onClick={handleBack}
    />
  );
};
