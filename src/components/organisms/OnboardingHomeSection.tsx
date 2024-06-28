import React from "react";
import { useIntl } from "react-intl";

import { OnboardingHomeCard } from "~/components/organisms/OnboardingHomeCard";
import { HomeSectionWrapper } from "~/components/templates";

export type OnboardingHomeSectionProps = Omit<
  React.ComponentPropsWithRef<typeof HomeSectionWrapper>,
  "title" | "children"
>;

export const OnboardingHomeSection: React.FC<OnboardingHomeSectionProps> = (
  props
) => {
  const { ...wrapperProps } = props;

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "OnboardingHomeSection.title",
    defaultMessage: "Begin Your Journey",
    description: "Title of the Onboarding section on the home page",
  });

  return (
    <HomeSectionWrapper {...wrapperProps} title={title}>
      <OnboardingHomeCard className="px-6" />
    </HomeSectionWrapper>
  );
};
