# gamdom-task

**Online betting dashboard** allows users to view betting events, select odds, place bets, and receive real-time feedback via a snackbar notification system.
Details are [here](full-stack-developer-homework-assignment.pdf).

## Features
- **⚽ Event-Based Betting System**: Browse live events and place bets in real time.
- **📊 Dynamic Odds Display**: Events display odds dynamically fetched from the API.
- **🎫 Bet Slip Management**: Select and manage bets via an intuitive bet slip.
- **🚀 Optimized API Calls**: Uses `@tanstack/react-query` for caching and performance.
- **🔄 State Management with Zustand**: Efficient global state handling for UI and betting logic.
- **🌐 Localization Support**: `i18next` integration for multilingual UI with structured translations.
- **🎨 Modern UI**: Built with `Material-UI (MUI)` for a clean and responsive design.
- **🖥️ Fast & Modular Backend**: `Node.js + Express + Drizzle ORM (PostgreSQL)` for high-performance data handling.
- **🛠️ Dockerized Deployment**: Supports containerized setup for easy scalability.
- **📡 Live Event Fetching**: Uses `ky` for efficient API requests and automatic JSON parsing.
- **✅ Unit & E2E Testing**: `Vitest, Jest, Supertest, and Playwright` ensure high code quality.
- **🛠️ Error Handling & Retry Logic**: Graceful API error handling and user notifications.
- **🧹 Database Seeding & Migrations**: `Drizzle Kit` manages database schema and migrations.
- **📜 Logging & Debugging**: `Pino` for structured logs and debugging.
- **🧪 Test Coverage & CI Integration**: Automated test execution with coverage reports.

## Tech Stack
- **Client**: React 19, Zustand, Vite, Material UI, I18next, React Query
- **Server**: Node.js, Express, Typescript, Pino
- **Database**: Postgres, Drizzle
- **Testing**: Playwright, Vitest, Supertest, Jest
- **Deployment**: Docker, Docker Swarm
- **Code Quality**: ESLint, Prettier, pre-commit hooks, lint-staged

## Commands

### Installation

Install dependencies, [Docker](https://docs.docker.com/get-docker/)

`npm install` Install dependencies

`brew install --cask docker` Install Docker using brew example

### Development

Don't forget to stop Postgres when exit development mode

(1) `npm run postgres:start` Start Postgres

(2) `npm run postgres:prepare` Create Postgres table and seed it with mock data

(3) `npm run start` Start client and server

`npm run start:client` Start client

`npm run start:server` Start server

`npm run postgres:stop` Stop Postgres

### Testing

Run application in development (1-3) or production (1-3) mode first

`npm run test` Run client, server and e2e tests

`npm run test:e2e` Run Playwright end-to-end tests

`npm run test:client` Run client tests

`npm run test:server` Run server tests

`npm run test:watch` Run client and server tests in watch mode

`npm run test:watch:client` Run client tests in watch mode

`npm run test:watch:server` Run server tests in watch mode

`npm run test:coverage` Run client and server tests coverage report

`npm run test:client:coverage` Run client tests coverage report

`npm run test:server:coverage` Run server tests coverage report

### Build

Build client and server

`npm run build` Build client and server

`npm run build:client` Build client

`npm run build:server` Build server

### Production

Docker commands for client, server and Postgres images

(1) `npm run docker:build` Build Docker images

(2) `npm run docker:deploy` Deploy Docker containers

(3) `npm run postgres:migrate` Create Postgres table

`npm run docker:rm` Remove Docker containers

`npm run docker:init` Init Docker

`npm run docker:status` Show Docker status

`npm run docker:logs` Show Docker logs

`npm run docker:prune` Prune Docker containers

### Code quality

Code quality checks and fixes

`npm run lint` Run code quality checks

`npm run lint:fix` Run code quality fixes

`npm run update` Update libraries to the latest versions

## API Endpoints
- **`GET /api/events`**: Fetch all available events.
- **`POST /api/events`**: Create a new event with odds.
- **`PUT /api/events`**: Update an existing event.
- **`DELETE /api/events`**: Delete an event.