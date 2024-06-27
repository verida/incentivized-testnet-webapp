import {
  Button,
  ButtonBaseVariants,
  Icon,
  IconButton,
  Typography,
} from "components/atoms";
import React, { useCallback, useId } from "react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import { PortalWrapper } from "~/components/molecules";
import { EVENT_TYPE_KEYDOWN, KEY_NAME_ESC } from "~/constants";

// TODO: Implement similar to the Alert component
export type ModalAction = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
} & ButtonBaseVariants;

export type ModalProps = {
  title?: string;
  open: boolean;
  centered?: boolean;
  alignBottomOnMobile?: boolean;
  className?: string;
  onClose: () => void;
  actions?: ModalAction[];
  children: React.ReactNode;
};

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const {
    title,
    open,
    centered,
    alignBottomOnMobile,
    className = "",
    onClose,
    actions,
    children,
  } = props;
  const labelId = useId();

  const handleEscapeKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.body.addEventListener(EVENT_TYPE_KEYDOWN, handleEscapeKeyPress);
    return () => {
      document.body.removeEventListener(
        EVENT_TYPE_KEYDOWN,
        handleEscapeKeyPress
      );
    };
  }, [handleEscapeKeyPress]);

  if (!open) {
    return null;
  }

  // TODO: use <dialog> instead of a react portal

  return (
    <PortalWrapper>
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-[10px]"
        onClick={onClose}
      />
      <div
        className={twMerge(
          "fixed z-50 border border-solid border-border bg-background sm:top-1/2 sm:left-1/2 sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2",
          alignBottomOnMobile
            ? "w-full bottom-0 sm:bottom-auto rounded-t-3xl sm:rounded-b-3xl"
            : "left-6 right-6 top-1/2 -translate-y-1/2 rounded-3xl",
          className
        )}
        aria-labelledby={labelId}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={twMerge(
            "relative px-4 sm:p-8 pt-6 pb-8 flex flex-col gap-8 max-h-[90Vh] sm:max-h-[80vh]",
            centered ? "items-center" : ""
          )}
        >
          <div className="flex items-center w-full justify-between">
            <Typography
              variant="heading-s"
              component="h2"
              id={labelId}
              className="px-2"
            >
              {title}
            </Typography>
            <IconButton
              size="small"
              variant="text"
              color="secondary"
              onClick={onClose}
              icon={<Icon type="close" size={20} />}
            />
          </div>
          <div className="overflow-auto">{children}</div>
          {actions && actions.length > 0 ? (
            <div className="flex flex-row-reverse gap-2">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  onClick={action.onClick}
                  variant={action.variant}
                  disabled={action.disabled}
                  color={action.color || undefined}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </PortalWrapper>
  );
};
