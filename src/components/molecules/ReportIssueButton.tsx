import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ButtonLink, Icon } from "~/components/atoms";
import { ISSUE_REPORTING_FORM_URL } from "~/constants";
import { PlausibleEvent, capturePlausibleEvent } from "~/features/plausible";

export type ReportIssueButtonProps = Omit<
  React.ComponentPropsWithRef<typeof ButtonLink>,
  "href" | "children" | "size" | "variant" | "color" | "openInNewTab"
>;

export const ReportIssueButton: React.FunctionComponent<
  ReportIssueButtonProps
> = (props) => {
  const { className, ...otherProps } = props;

  const i18n = useIntl();

  const reportIssueButtonLabel = i18n.formatMessage({
    id: "ReportIssueButton.reportIssueButtonLabel",
    description: "Label of the button to access the form to report an issue",
    defaultMessage: "Report Issue",
  });

  const handleClickCapture = useCallback(() => {
    capturePlausibleEvent(PlausibleEvent.REPORT_ISSUE_BUTTON_CLICKED);
  }, []);

  return (
    <ButtonLink
      href={ISSUE_REPORTING_FORM_URL}
      openInNewTab
      size="small"
      variant="contained"
      color="secondary"
      className={twMerge(
        // For now, it's the only button with this spacing, consider a 'size' variant if more
        "py-1.5 px-3 rounded-xl backdrop-blur-[5px] w-fit",
        className
      )}
      onClickCapture={handleClickCapture}
      {...otherProps}
    >
      <Icon type="bug" size={20} />
      {reportIssueButtonLabel}
    </ButtonLink>
  );
};
