# job-alerts-microservice

[![Build Status](https://travis-ci.org/bmealhouse/job-alerts-microservice.svg?branch=master)](https://travis-ci.org/bmealhouse/job-alerts-microservice)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Monitor websites for new job postings

## Getting started

### Installation

```sh
yarn global add wt-cli
yarn && yarn dev
```

## Scripts

### `yarn dev`

Runs the service in development using [micro-dev](https://github.com/zeit/micro-dev).<br>
Automatically restarts the service when a code change is detected.

### `yarn start`

Runs the service in production using [micro](https://github.com/zeit/micro).<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Runs the tests using [Jest](https://facebook.github.io/jest/).<br>
Code coverage report will also be included in command line output.

## Webtask management

```sh
wt create ./webtask.js --name job-alerts-webtask
wt edit job-alerts-webtask
wt update job-alerts-webtask ./webtask.js
```

### Real-time logging

```sh
wt logs -v
```

### Production scheduling

```sh
wt cron create --name job-alerts-webtask --secret JOB_ALERTS_AUTH_TOKEN=$JOB_ALERTS_AUTH_TOKEN --secret JOB_ALERTS_ENDPOINT=$JOB_ALERTS_ENDPOINT --schedule "0 18 * * *" --tz "America/Chicago" ./webtask.js
```

> Every day at 18:00.
