import { PlausibleEvent } from "~/features/plausible";

declare const window: {
  plausible: (event: string, props?: Record<string, unknown>) => void;
};

export const capturePlausibleEvent = (
  event: PlausibleEvent,
  props?: Record<string, unknown>
) => {
  if (window.plausible) {
    window.plausible(event, { props });
  }
};
