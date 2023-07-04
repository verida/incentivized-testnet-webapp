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
        className:
          "bg-notification rounded-lg shadow-lg text-notification-foreground",
        error: {
          icon: <Icon type="notification-error" />,
        },
        success: {
          icon: <Icon type="notification-success" />,
        },
      }}
    />
  );
};
