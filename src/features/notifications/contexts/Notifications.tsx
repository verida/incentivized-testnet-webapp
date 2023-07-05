import React from "react";
import { Toaster } from "react-hot-toast";

import { Icon } from "~/components/atoms";

export const Notifications: React.FunctionComponent = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={true}
      toastOptions={{
        duration: 10000,
        className:
          "bg-notification backdrop-blur-[10px] rounded-lg border border-solid border-divider shadow-xl text-notification-foreground",
        error: {
          icon: <Icon type="notification-error" className="text-error" />,
          className:
            "bg-notification backdrop-blur-[10px] rounded-lg border border-solid border-divider shadow-xl text-notification-foreground",
        },
        success: {
          icon: <Icon type="notification-success" className="text-success" />,
          className:
            "bg-notification backdrop-blur-[10px] rounded-lg border border-solid border-divider shadow-xl text-notification-foreground",
        },
      }}
    />
  );
};
