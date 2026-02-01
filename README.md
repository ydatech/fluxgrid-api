# FluxGrid - Backend API for Multi-Unit Solar Credit Allocation

## Description

FluxGrid is a backend system designed to manage and allocate solar energy credits from a shared solar installation accross multiple commercial tenants with different tiers and subscription shares.

## Technology Stack
- Node.js 20+
- NestJS (TypeScript)
- Prisma ORM
- SQLite
- Swagger/OpenAPI
- Jest Unit Testing

## System Architecture
The system is composed of modular services:
- Tenant Management
- Data Ingestion
- Allocation Engine
- Reporting API

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.