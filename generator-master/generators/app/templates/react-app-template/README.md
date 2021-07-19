# react-app-template

React application template for fast start develop. The template includes the next decisions:
* [Typescript](https://www.typescriptlang.org/) for typing the application.
* [React router](https://reactrouter.com/web/guides/quick-start) for routing the application.
* [Redux](https://redux.js.org/basics/usage-with-react) for storing application data.
* [Redux-saga](https://redux-saga.js.org/) for side effects.
* [fp-ts](https://gcanti.github.io/fp-ts/) for functional programming in Typescript.
* [io-ts](https://gcanti.github.io/io-ts/) for IO decoding/encoding.


## Quick start

You can use [generator-react-app](https://github.com/voronindenis/generator-react-app) to quickly install this template, or clone this repository.

## Usage

This template includes a few scripts.

### Start development mode or building

```bash
npm start
```

Runs the app in development mode.
Open  http://0.0.0.0:8080 to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

```bash
npm run build
```

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

### Testing the application

Run tests with:

```bash
npm run test
```

Update tests with:

```bash
npm run test-update
```

Run watch mode with:

```bash
npm run test-watch
```

[Read more about testing](https://jestjs.io/en/).

### Check the code quality using eslint

Run check with:

```bash
npm run lint
```

Run check in fix mode with:

```bash
npm run lint-fix
```

[Read more about eslint](https://eslint.org/).

### Build UI components in isolation

Scripts are temporarily not working due to this [issue](https://github.com/storybookjs/storybook/issues/9216).

Run storybook with:

```bash
npm run storybook
```

Build static storybook with:

```bash
npm run build-storybook
```

[Read more about storybook](https://storybook.js.org/).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
UNLICENSED
