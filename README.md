## Description

This project is a Job Aggregator API that fetches job postings from multiple external providers, normalizes the data, stores it in a database, and provides an API for retrieval and filtering. It also includes a scheduled job to periodically update job postings.

## Tech Stack

Backend: NestJS (TypeScript)

Database: PostgreSQL with TypeORM

Scheduling: NestJS Cron Jobs

Testing: Jest

## Installation & Setup

Clone the repository:

```bash
$ git clone https://github.com/Masoumeh-Hashemi/jobs-app.git
```

Install dependencies:

```bash
$ npm install
```

Update .env with the required values (database URL).

```bash
$ postgresql://USERNAME:PASSWORD@localhost:5432/jobdb
```

Start the application:

```bash
npm run start
```

## Test

```bash
$ npm run test
```

```bash
$ npm run test:e2e
```

## Access API:

```bash
Health check: http://localhost:3000

Jobs API Documentation: http://localhost:3000/api/docs
```

## NEXT Steps:

1. Dockerize the app
2. Have an test database for e2e tests
