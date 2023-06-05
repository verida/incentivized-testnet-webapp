import React from "react";
import { Toaster } from "react-hot-toast";

import { Icon } from "~/components/atoms";

export const Notifications: React.FunctionComponent = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={true}
      toastOptions={{
        duration: 8000,
        // TODO: Define colour in tailwind config file
        className: "bg-[#585871] rounded-lg shadow-lg text-primary",
        error: {},
        success: {
          icon: <Icon type="verida-tick" />,
        },
      }}
    />
  );
};
