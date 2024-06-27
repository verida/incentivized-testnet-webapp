import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import ActivityCompletedImage from "~/assets/images/activity_completed_illustration.png";
import { Typography } from "~/components/atoms";
import { Modal } from "~/components/templates";

export type ActivityCompletionModalProps = {
  open: boolean;
  onClose: () => void;
  nextActivityId?: string;
};

export const ActivityCompletionModal: React.FC<ActivityCompletionModalProps> = (
  props
) => {
  const { open, onClose, nextActivityId } = props;

  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    onClose();
    navigate(nextActivityId ? `/activities/${nextActivityId}` : "/");
  }, [nextActivityId, navigate]);

  const i18n = useIntl();

  const titleMessage = i18n.formatMessage({
    id: "ActivityCompletionModal.titleMessage",
    defaultMessage: "Activity Completed!",
    description: "Title of the activity completion modal",
  });

  const activityCompleteSectionMessage = i18n.formatMessage({
    id: "ActivityCompletionModal.activityCompleteSectionMessage",
    description:
      "Message displayed below the title of the activity completion modal",
    defaultMessage: "Congratulations! You've completed this activity.",
  });

  const closeButtonLabel = i18n.formatMessage({
    id: "ActivityCompletionModal.closeButtonLabel",
    defaultMessage: "Next Activity",
    description: "Label for the close button of the activity completion modal",
  });

  return (
    <Modal
      open={open}
      centered
      className="!max-w-[560px]"
      onClose={onClose}
      actions={[
        {
          label: closeButtonLabel,
          onClick: handleNext,
          variant: "contained",
          color: "primary",
        },
      ]}
    >
      <div className="bg-background p-3 -mt-10 rounded-xl flex flex-col items-center gap-2">
        <div className="h-50">
          <img src={ActivityCompletedImage} alt="" loading="eager" />
        </div>
        <Typography variant={"heading-m"}>{titleMessage}</Typography>
        <Typography className="text-desktop-base text-center">
          {activityCompleteSectionMessage}
        </Typography>
      </div>
    </Modal>
  );
};
