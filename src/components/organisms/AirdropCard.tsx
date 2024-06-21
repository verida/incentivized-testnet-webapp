import React, { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import {
  AirdropUserStatus,
  Button,
  ButtonLink,
  Typography,
} from "~/components/atoms";
import { AirdropRequirementsModal } from "~/components/modals";
import { VdaTokensChip } from "~/components/molecules";
import {
  AirdropDefinition,
  AirdropUserStatus as AirdropUserStatusType,
  useAirdrops,
} from "~/features/airdrops";

export type AirdropCardProps = {
  airdrop: AirdropDefinition;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const AirdropCard: React.FC<AirdropCardProps> = (props) => {
  const { airdrop, ...divProps } = props;

  const { airdropUserStatues } = useAirdrops();

  const airdropUserStatus: AirdropUserStatusType = useMemo(() => {
    return airdropUserStatues[airdrop.id] || "notApplicable";
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

  return (
    <>
      <div {...divProps}>
        <div className="bg-background rounded-3xl">
          <div className="border border-border rounded-3xl p-1 bg-gradient-to-br from-transparent-8 to-transparent-3 shadow-[12px_24px_40px_0px_rgba(0,0,0,0.15)] flex flex-col">
            <div
              className="rounded-[1.25rem] px-4 py-6 shadow-[0px_3px_4px_1px_rgba(0,0,0,0.15)_inset] flex flex-col gap-6"
              style={{
                background: `linear-gradient(290deg, hsla(var(--black) / 0.30) 20%, ${airdrop.accentColor} 90%)`,
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <Typography variant="heading-m">
                  {i18n.formatMessage(airdrop.title)}
                </Typography>
                <VdaTokensChip nbVdaTokens={airdrop.vdaAllocation} />
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
            <div className="px-4 py-5 flex flex-col sm:flex-row sm:justify-between gap-6">
              <div className="flex flex-col justify-end">
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleRequirementsButtonClick}
                  className="w-full sm:w-fit"
                >
                  {requirementsButtonLabel}
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                {/** TODO: Rework this part to better taking into account the
                 * different states of the airdrop, in which stage it is
                 * (registration, claim, ended) and the user status (waiting
                 * for registration, registered, claimed, etc.)
                 */}
                {airdropUserStatus === "waitingRegistration" ||
                airdropUserStatus === "notApplicable" ? (
                  <Typography className="text-center sm:text-right text-muted-foreground">
                    {i18n.formatMessage(airdrop.actionMessage)}
                  </Typography>
                ) : null}
                <div className=" flex flex-col sm:flex-row gap-6 justify-end">
                  {airdropUserStatus === "waitingRegistration" ||
                  airdropUserStatus === "notApplicable" ? (
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

                  <ButtonLink
                    href={airdrop.resource.url}
                    openInNewTab
                    variant="contained"
                    color="secondary"
                    className="w-full sm:w-fit"
                  >
                    {i18n.formatMessage(airdrop.resource.label)}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AirdropRequirementsModal
        open={openRequirementsModal}
        onClose={handleCloseRequirementsModal}
        airdropTitle={i18n.formatMessage(airdrop.title)}
        requirementsMessage={airdrop.requirements}
      />
    </>
  );
};
