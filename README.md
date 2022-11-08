# Diet Tool Microservice

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript base setup.

## Prerequisites

* Editor: VsCode
* node >= 16

## Installation

```bash
# Installation
$ npm install

# To check for unused packages
$ npx depcheck
```

## Running the app

- Create `.env` file in project root refering to the values specified in `.env.example`

## Swagger Api Documentation

* [Local](http://localhost:3000/api-docs)

## Fittr Module Dependencies

* [@fittr/authdataservice](https://bitbucket.org/community_developers/fittr_auth_dataservice_module/src/master/)

* [@fittr/logger](https://bitbucket.org/community_developers/fittr_logger_module/src/master/)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Lint

```bash
# check linting issues
$ npm run lint

# fix linting issues
$ npm run lint --fix
```

## Format

```bash
# check linting issues
$ npm run format

# fix linting issues
$ npm run format --fix
```

## Migrations

- Create database as mentioned in `DB_NAME` value in `.env` 
- Setup entities in database by running following migration command.

```bash
# Local Database
npm run migration:run:local

# Production
npm run migration:run:prod
```

- Generate/Update migration files

```bash
npm run migration:generate
```

- Revert migrations

```bash
# Local Database
npm run migration:revert:local

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
