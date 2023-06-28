import React, { useCallback, useMemo } from "react";

// import { AcceptTermsAmdConditionsModal } from "~/components/organisms";
// import { useTermsConditionsQueries } from "~/features/termsconditions/hooks";
import { TermsConditionsStatus } from "~/features/termsconditions/types";
import { useVerida } from "~/features/verida";

// TODO: Add Sentry breadcrumb details

type TermsConditionsContextType = {
  isCheckingStatus: boolean;
  status: TermsConditionsStatus;
  updateStatus: (status: TermsConditionsStatus) => void;
  deleteTermsStatus: () => void;
  openAcceptModal: () => void;
};

export const TermsConditionsContext =
  React.createContext<TermsConditionsContextType | null>(null);

type TermsConditionsProviderProps = {
  children?: React.ReactNode;
};

export const TermsConditionsProvider: React.FunctionComponent<
  TermsConditionsProviderProps
> = (props) => {
  // const [openModal, setOpenModal] = useState(false);
  const { isConnected } = useVerida();

  // const { isCheckingStatus, status, saveStatus, deleteStatus } =
  //   useTermsConditionsQueries();

  // useEffect(() => {
  //   if (!isConnected || isCheckingStatus || status === "accepted") {
  //     setOpenModal(false);
  //   } else {
  //     setOpenModal(true);
  //   }
  // }, [isCheckingStatus, isConnected, status]);

  const openAcceptModal = useCallback(() => {
    // if (!isConnected || isCheckingStatus) {
    if (!isConnected) {
      // Do not open if user not connected
      return;
    }
    // setOpenModal(true);
  }, [isConnected]);

  const updateStatus = useCallback(async (_status: TermsConditionsStatus) => {
    // await saveStatus(status);
  }, []);

  const deleteTermsStatus = useCallback(async () => {
    // await deleteStatus();
  }, []);

  // const handleCloseModal = useCallback(() => {
  //   setOpenModal(false);
  // }, []);

  const contextValue: TermsConditionsContextType = useMemo(
    () => ({
      // isCheckingStatus,
      isCheckingStatus: false,
      // status: status ?? "unknown",
      status: "accepted",
      updateStatus,
      deleteTermsStatus,
      openAcceptModal,
    }),
    [updateStatus, deleteTermsStatus, openAcceptModal]
  );

  return (
    <TermsConditionsContext.Provider value={contextValue}>
      {props.children}
      {/* <AcceptTermsAmdConditionsModal
        open={openModal}
        onClose={handleCloseModal}
      /> */}
    </TermsConditionsContext.Provider>
  );
};
