import { config } from "~/config";
import { LogLevel } from "~/features/logger";
import { Sentry } from "~/features/sentry";

const levelOrder: LogLevel[] = ["error", "warn", "info", "debug"];
const currentLogLevelIndex = levelOrder.indexOf(config.logLevel);

const sentryLevelMapping = {
  error: "error",
  warn: "warning",
  info: "info",
  debug: "debug",
} as const;

/**
 * Custom logger to use the console and/or add a breadcrumb to Sentry.
 *
 * The log level can be configured globally with the environment variable `REACT_APP_LOG_LEVEL`.
 *
 * The environment variable `REACT_APP_DEV_MODE` set to `true` will log in the console.
 *
 * The environment variable `REACT_APP_SENTRY_ENABLED` set to `true` will add a breadcrumb. Note that errors are skip for Sentry, `Sentry.captureException` must be used when needed.
 *
 * @todo Add the `Sentry.captureException` as part of this logger.
 */
export class Logger {
  private readonly category: string;

  constructor(category: string) {
    this.category = category;
  }

  private log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>
  ) {
    if (levelOrder.indexOf(level) > currentLogLevelIndex) {
      return;
    }

    if (config.devMode) {
      // eslint-disable-next-line no-console
      console[level](`[${this.category}] ${message}`, data);
    }

    if (config.sentry.enabled && level !== "error") {
      Sentry.addBreadcrumb({
        category: this.category,
        level: sentryLevelMapping[level],
        message,
        data,
      });
    }
  }

  public error(message: string, data?: Record<string, unknown>) {
    this.log("error", message, data);
  }

  public warn(message: string, data?: Record<string, unknown>) {
    this.log("warn", message, data);
  }

  public info(message: string, data?: Record<string, unknown>) {
    this.log("info", message, data);
  }

  public debug(message: string, data?: Record<string, unknown>) {
    this.log("debug", message, data);
  }
}
