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

export type ModalAction = {
  label: string;
  onClick: () => void;
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
        className="fixed bottom-0 z-50 w-full rounded-t-3xl border border-solid border-gray-dark bg-background sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-b-3xl"
        aria-labelledby={labelId}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative px-4 pt-6 pb-8 sm:pb-4 sm:p-8 max-h-[90Vh] sm:max-h-[80vh] flex flex-col">
          <div className="mb-5 flex items-center justify-between sm:mb-8">
            <div className="flex-grow basis-0" />
            <Typography
              variant="heading-s"
              component="h2"
              id={labelId}
              className="px-2"
            >
              {title}
            </Typography>
            <div className="flex-grow basis-0 flex justify-end">
              <IconButton
                size="small"
                variant="text"
                onClick={onClose}
                icon={<Icon type="close" size={20} />}
              />
            </div>
          </div>
          <div className="overflow-auto">{children}</div>
          {actions && actions.length > 0 ? (
            <div className="mt-5 sm:mt-8">
              <div className="flex flex-row-reverse gap-2">
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    onClick={action.onClick}
                    variant={action.variant}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PortalWrapper>
  );
};
