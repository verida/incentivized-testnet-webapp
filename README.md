# Verida Incentivized Testnet Webapp

Aka. "Verida Missions"

## Development

The application is a frontend only.

### Install

Install the dependencies with `yarn`, there are postinstall scripts to also compile the localised messages as well as generate the needed version info file.

```
yarn install
```

Some environment variables are required for the application to run. Have a look at the provided examples.

Copy `.env.example`, rename it to `.env` and modify the variables for your local environment.

```
cp .env.example .env
```

### Run

The application can be started with its dedicated development server supporting hot reloading:

```
yarn run start
```

### Development Mode

There is an environment variable `REACT_APP_DEV_MODE` which, once set to `true`, enables a few dev-only features:

- The custom application `Logger` writes the logs into the `console`. (Check `.env.example` for setting the log level)
- Show the `hidden` activities
- Add a "Delete User Activities" button in the profile menu to reset the activity status of the logged user
- Add a "Delete Terms" button in the profile menu to reset the terms & conditions status of the logged user

### Linting and Formatting

We use eslint for the linting and prettier for the formatting.

Scripts are available to check and fix issues.

```
yarn run check
```

```
yarn run fix
```

### i18n

This project uses `react-intl` to manage the internationalisation. No user-facing messages should be hardcoded, there is a eslint rule throwing an error in such case.

Messages are all listed in a dedicated json file in the `messages` folder at the root of the project. Supporting multiple languages is about providing translations in the appropriate json files.

When running `yarn install`, `yarn run start` or `yarn run build` the messages are automatically compiled under `src/lib/lang`. The compiled messages are the one used by the app

#### Usage

Use the hook `useIntl` which provides a set of functions such as `formatMessage`.

For messages, the `id` must be unique and following the naming convention `<ComponentName>.<variableName>`. The default message should always be set as it can be used as a fallback. It's also a good practice to give a description right away.

```jsx
const SubmitButton = () => {
  const i18n = useIntl();

  const buttonLabel = i18n.formatMessage({
    id: "SubmitButton.buttonLabel",
    description: "Label of the Submit button",
    defaultMessage: "Submit",
  });

  return <button>{buttonLabel}</button>;
};
```

The message definition should always be copied into the json files in the messages folder (`messages/en.json`).

```json
{
  "SubmitButton.buttonLabel": {
    "description": "Label of the Submit button",
    "defaultMessage": "Submit"
  }
}
```

You can run a dedicated script to extract all messages into the json file.

```
yarn run messages:extract
```

See more information on the [react-intl documentation](https://formatjs.io/docs/getting-started/message-declaration).

### Test

```
yarn run test
```

### Build

```
yarn run build
```

Messages are compiled automatically before the build.

## Deployment

Before building and deploying, set the environment variables according to your platform. See the required variables in `.env.example`.
The variables `NODE_ENV` must be set to the value `production` for an optimised bundle. This is usually done by default on most platform.

The build command generates a build folder with the bundled static files of the frontend.

The build folder can be deployed to a CDN or equivalent (Netlify, Amplify, S3 web hosting, ..., heroku with the create-react-app buildpack fall in this options as well).

### Telemetry

Sentry is integrated for the reporting of errors and performance. Some steps are necessary while building the application to generate the source maps and upload them to Sentry alongside registering the new release and deployment. This must be done where the actual build is performed as the hash in the file name may be different.
