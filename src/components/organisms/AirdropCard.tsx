import React, { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { AirdropStatus, ButtonLink, Typography } from "~/components/atoms";
import { AirdropRequirementsModal } from "~/components/modals";
import {
  AirdropCardBase,
  ComingSoonAirdropCard,
  DaysCountdownChip,
  VdaTokensChip,
} from "~/components/molecules";
import {
  AirdropDefinition,
  AirdropUserStatus as AirdropUserStatusType,
  useAirdrops,
} from "~/features/airdrops";
import { getDaysLeft } from "~/utils";

export type AirdropCardProps = {
  airdrop: AirdropDefinition;
} & Omit<
  React.ComponentProps<typeof AirdropCardBase>,
  "topContent" | "bottomContent" | "accentColor"
>;

export const AirdropCard: React.FC<AirdropCardProps> = (props) => {
  const { airdrop, ...airdropCardBaseProps } = props;

  const { airdropUserStatues } = useAirdrops();

  const airdropUserStatus: AirdropUserStatusType = useMemo(() => {
    return airdropUserStatues[airdrop.id] || "none";
  }, [airdrop, airdropUserStatues]);

  const [openRequirementsModal, setOpenRequirentsModal] = useState(false);

  const handleRequirementsButtonClick = useCallback(() => {
    setOpenRequirentsModal(true);
  }, []);

  const handleCloseRequirementsModal = useCallback(() => {
    setOpenRequirentsModal(false);
  }, []);

  const i18n = useIntl();

  if (airdrop.status === "coming-soon") {
    return (
      <ComingSoonAirdropCard
        {...airdropCardBaseProps}
        title={i18n.formatMessage(airdrop.title)}
      />
    );
  }

  const requirementsButtonLabel = i18n.formatMessage({
    id: "AirdropCard.requirementsButtonLabel",
    defaultMessage: "Requirements",
    description: "Label for the requirements button of the airdrop card",
  });

  const checkMessage = i18n.formatMessage({
    id: "AirdropCard.checkMessage",
    defaultMessage: "Check if you are included in the airdrop",
    description: "Message displayed above the check button in the airdrop card",
  });

  const checkButtonLabel = i18n.formatMessage({
    id: "AirdropCard.checkButtonLabel",
    defaultMessage: "Check",
    description: "Label for the check button of the airdrop card",
  });

  const registerMessage = i18n.formatMessage({
    id: "AirdropCard.registerMessage",
    defaultMessage: "Register before it's too late",
    description:
      "Message displayed above the register button in the airdrop card",
  });

  const registerButtonLabel = i18n.formatMessage({
    id: "AirdropCard.registerButtonLabel",
    defaultMessage: "Register",
    description: "Label for the register button of the airdrop card",
  });

  const claimMessage = i18n.formatMessage({
    id: "AirdropCard.claimMessage",
    defaultMessage: "Claim before it's too late",
    description: "Message displayed above the claim button in the airdrop card",
  });

  const claimButtonLabel = i18n.formatMessage({
    id: "AirdropCard.claimButtonLabel",
    defaultMessage: "Claim",
    description: "Label for the claim button of the airdrop card",
  });

  const missedAirdropMessage = i18n.formatMessage({
    id: "AirdropCard.missedAirdropMessage",
    defaultMessage: "Unfortunately you missed this airdrop",
    description:
      "Message displayed in the airdrop card when the user missed the registration or claiming",
  });

  const waitForClaimMessage = i18n.formatMessage({
    id: "AirdropCard.waitForClaimMessage",
    defaultMessage: "Please wait for the claim to open",
    description:
      "Message displayed in the airdrop card when the user is registered and has to wait for the claim process to open",
  });

  return (
    <>
      <AirdropCardBase
        {...airdropCardBaseProps}
        accentColor={airdrop.accentColor}
        topContent={
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Typography variant="heading-m">
                {i18n.formatMessage(airdrop.title)}
              </Typography>
              {airdrop.vdaAllocation ? (
                <VdaTokensChip nbVdaTokens={airdrop.vdaAllocation} />
              ) : null}
            </div>
            {airdrop.description ? (
              <Typography className="text-muted-foreground">
                {i18n.formatMessage(airdrop.description, {
                  newline: (
                    <>
                      <br />
                    </>
                  ),
                })}
              </Typography>
            ) : null}
          </div>
        }
        bottomContent={
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
            <div className="flex flex-col justify-end">
              {airdrop.requirements ? (
                <button
                  onClick={handleRequirementsButtonClick}
                  className="w-full sm:w-fit underline py-2.5 bg-transparent text-foreground"
                >
                  {requirementsButtonLabel}
                </button>
              ) : null}
            </div>
            <div className="flex flex-col gap-6 items-end">
              {airdrop.status === "check" ? (
                <Typography className="text-center sm:text-right text-muted-foreground">
                  {checkMessage}
                </Typography>
              ) : airdrop.status === "registration-opened" &&
                (airdropUserStatus === "not-connected" ||
                  airdropUserStatus === "none") ? (
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <Typography className="text-center sm:text-right text-muted-foreground">
                    {registerMessage}
                  </Typography>
                  {airdrop.registrationCloseDate ? (
                    <DaysCountdownChip
                      // TODO: Optimise as this can be negative
                      nbDaysLeft={getDaysLeft(airdrop.registrationCloseDate)}
                      variant="warning"
                    />
                  ) : null}
                </div>
              ) : airdrop.status === "claim-opened" &&
                (airdropUserStatus === "not-connected" ||
                  airdropUserStatus === "registered") ? (
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <Typography className="text-center sm:text-right text-muted-foreground">
                    {claimMessage}
                  </Typography>
                  {airdrop.claimCloseDate ? (
                    <DaysCountdownChip
                      // TODO: Optimise as this can be negative
                      nbDaysLeft={getDaysLeft(airdrop.claimCloseDate)}
                      variant="warning"
                    />
                  ) : null}
                </div>
              ) : ((airdrop.status === "registration-closed" ||
                  airdrop.status === "claim-opened" ||
                  airdrop.status === "claim-closed") &&
                  airdropUserStatus === "none") ||
                (airdrop.status === "claim-closed" &&
                  airdropUserStatus === "registered") ? (
                <Typography className="text-center sm:text-right text-muted-foreground">
                  {missedAirdropMessage}
                </Typography>
              ) : airdrop.status === "registration-closed" &&
                airdropUserStatus === "registered" ? (
                <Typography className="text-center sm:text-right text-muted-foreground">
                  {waitForClaimMessage}
                </Typography>
              ) : null}
              <div className=" flex flex-col sm:flex-row gap-6 justify-end">
                {airdrop.status === "check" ? (
                  <ButtonLink
                    variant="contained"
                    color="primary"
                    className="w-full sm:w-fit"
                    href={`/airdrops/${airdrop.id}`}
                    internal
                  >
                    {checkButtonLabel}
                  </ButtonLink>
                ) : airdrop.status === "registration-opened" &&
                  (airdropUserStatus === "not-connected" ||
                    airdropUserStatus === "none") ? (
                  <ButtonLink
                    variant="contained"
                    color="primary"
                    className="w-full sm:w-fit"
                    href={`/airdrops/${airdrop.id}`}
                    internal
                  >
                    {registerButtonLabel}
                  </ButtonLink>
                ) : airdrop.status === "claim-opened" &&
                  (airdropUserStatus === "not-connected" ||
                    airdropUserStatus === "registered") ? (
                  <ButtonLink
                    variant="contained"
                    color="primary"
                    className="w-full sm:w-fit"
                    href={`/airdrops/${airdrop.id}`}
                    internal
                  >
                    {claimButtonLabel}
                  </ButtonLink>
                ) : (
                  <AirdropStatus
                    airdropStatus={airdrop.status}
                    userStatus={airdropUserStatus}
                  />
                )}
                {airdrop.resource ? (
                  <ButtonLink
                    href={airdrop.resource.url}
                    openInNewTab
                    variant="contained"
                    color="secondary"
                    className="w-full sm:w-fit"
                  >
                    {i18n.formatMessage(airdrop.resource.label)}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        }
      />
      {airdrop.requirements ? (
        <AirdropRequirementsModal
          open={openRequirementsModal}
          onClose={handleCloseRequirementsModal}
          airdropTitle={i18n.formatMessage(airdrop.title)}
          requirementsMessage={airdrop.requirements}
        />
      ) : null}
    </>
  );
};
