import React, { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import {
  AirdropUserStatus,
  Button,
  ButtonLink,
  Typography,
} from "~/components/atoms";
import { AirdropRequirementsModal } from "~/components/modals";
import {
  AirdropCardBase,
  ComingSoonAirdropCard,
  VdaTokensChip,
} from "~/components/molecules";
import {
  AirdropDefinition,
  AirdropUserStatus as AirdropUserStatusType,
  useAirdrops,
} from "~/features/airdrops";

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
    return airdropUserStatues[airdrop.id] || "not-applicable";
  }, [airdrop, airdropUserStatues]);

  const [openRequirementsModal, setOpenRequirentsModal] = useState(false);

  const handleRequirementsButtonClick = useCallback(() => {
    setOpenRequirentsModal(true);
  }, []);

  const handleCloseRequirementsModal = useCallback(() => {
    setOpenRequirentsModal(false);
  }, []);

  const i18n = useIntl();

  const requirementsButtonLabel = i18n.formatMessage({
    id: "AirdropCard.requirementsButtonLabel",
    defaultMessage: "Requirements",
    description: "Label for the requirements button of the airdrop card",
  });

  if (airdrop.status === "coming-soon") {
    return (
      <ComingSoonAirdropCard
        {...airdropCardBaseProps}
        title={i18n.formatMessage(airdrop.title)}
      />
    );
  }

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
            <Typography className="text-muted-foreground">
              {i18n.formatMessage(airdrop.description, {
                newline: (
                  <>
                    <br />
                  </>
                ),
              })}
            </Typography>
          </div>
        }
        bottomContent={
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
            <div className="flex flex-col justify-end">
              {airdrop.requirements ? (
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleRequirementsButtonClick}
                  className="w-full sm:w-fit"
                >
                  {requirementsButtonLabel}
                </Button>
              ) : null}
            </div>
            <div className="flex flex-col gap-6">
              {/** TODO: Rework this part to better taking into account the
               * different states of the airdrop, in which stage it is
               * (registration, claim, ended) and the user status (waiting
               * for registration, registered, claimed, etc.)
               */}
              {airdropUserStatus === "waiting-registration" ||
              airdropUserStatus === "not-applicable" ? (
                <Typography className="text-center sm:text-right text-muted-foreground">
                  {i18n.formatMessage(airdrop.actionMessage)}
                </Typography>
              ) : null}
              <div className=" flex flex-col sm:flex-row gap-6 justify-end">
                {airdropUserStatus === "waiting-registration" ||
                airdropUserStatus === "not-applicable" ? (
                  <ButtonLink
                    variant="contained"
                    color="primary"
                    className="w-full sm:w-fit"
                    href={`/airdrops/${airdrop.id}`}
                    internal
                  >
                    {i18n.formatMessage(airdrop.actionLabel)}
                  </ButtonLink>
                ) : (
                  <AirdropUserStatus status={airdropUserStatus} />
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
