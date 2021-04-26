# Wren Kitchens Development Task

## Getting Started

To build & run the app you should install [NodeJS](https://nodejs.org/en/) and then run the following:

```bash
npm install
npm start
```

The app is written using [TypeScript](https://www.typescriptlang.org/). The bundle is generated using [Webpack](https://webpack.js.org/) and the UI uses [ReactJS](https://reactjs.org/)

## Testing

For testing, we are using [Jest](https://jestjs.io/docs/tutorial-react)

To run the tests run

```bash
npm test
```

Make sure you have installed the dependencies first by running `npm install`.

## Usage

1. Use the form to create and add sheep to the field
1. To mark a sheep as branded just click on its image. Sheep must be in the field first.
1. To encourage two random sheep to breed, select them first from the data table and then click on the `Breed` button. If successful, a new sheep will appear into the field. A random name and gender will be given to it.

### Logic for breeding:

1. The probability of a female sheep giving birth after mating is 50%
1. Branded sheep are not able to breed
1. You need to choose a male and a female sheep
1. You need to choose two sheep for the breeding to happen

## ToDo

1. Add a state management lib
1. Increase test coverage
1. Make UI a bit more responsive for small screens
