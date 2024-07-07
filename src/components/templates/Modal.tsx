import {
  Button,
  ButtonBaseVariants,
  Icon,
  IconButton,
  Typography,
} from "components/atoms";
import React, { useCallback, useId } from "react";
import { useEffect } from "react";

import { PortalWrapper } from "~/components/molecules";
import { EVENT_TYPE_KEYDOWN, KEY_NAME_ESC } from "~/constants";

// TODO: Implement similar to the Alert component
export type ModalAction = {
  label: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
} & ButtonBaseVariants;

export type ModalProps = {
  title?: string;
  open: boolean;
  onClose: () => void;
  actions?: ModalAction[];
  children: React.ReactNode;
};

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
  const { title, open, onClose, actions, children } = props;
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
        className="fixed bottom-0 z-50 w-full rounded-t-3xl border border-solid border-border bg-background sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-b-3xl"
        aria-labelledby={labelId}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative px-4 sm:p-8 pt-6 pb-8 flex flex-col gap-8 max-h-[90Vh] sm:max-h-[80vh]">
          <div className="flex items-center justify-between">
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
              {actions.map((action, index) => (
                <Button
                  key={index}
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
