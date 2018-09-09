# job-alerts-microservice

[![Build Status](https://travis-ci.org/bmealhouse/job-alerts-microservice.svg?branch=master)](https://travis-ci.org/bmealhouse/job-alerts-microservice)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Monitor websites for new job postings

## Getting Started

### Installation

```sh
yarn && yarn start
```

## Scripts

### `yarn deploy`

Deploys the service to [now](https://zeit.co/now).<br>
The deployment is also aliased to the production URL.

### `yarn dev`

Runs the service in development using [micro-dev](https://github.com/zeit/micro-dev).<br>
Automatically restarts the service when a code change is detected.

### `yarn start`

Runs the service in production using [micro](https://github.com/zeit/micro).<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Runs the tests using [Jest](https://facebook.github.io/jest/).<br>
Code coverage report will also be included in command line output.
