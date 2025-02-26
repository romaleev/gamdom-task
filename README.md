# gamdom-task

**Online betting dashboard** allows users to view betting events, select odds, place bets, and receive real-time feedback via a snackbar notification system.
Details are [here](full-stack-developer-homework-assignment.pdf).

## Features
- **⚽ Event-Based Betting System**: Browse live events and place bets in real time.
- **📊 Dynamic Odds Display**: Events display odds dynamically fetched from the API.
- **🎫 Bet Slip Management**: Select and manage bets via an intuitive bet slip.
- **🚀 Optimized Validated API Calls**: Uses `@tanstack/react-query` for caching and performance, `Zod` for validation.
- **🔄 State Management with Zustand**: Efficient global state handling for UI and betting logic.
- **🌐 Localization Support**: `i18next` integration for multilingual UI with structured translations.
- **🎨 Modern UI**: Built with `Material-UI (MUI)` for a clean and responsive design.
- **🖥️ Fast & Modular Backend**: `Node.js + Express + Drizzle ORM (PostgreSQL)` for high-performance data handling.
- **🛠️ Dockerized Deployment**: Supports containerized setup for easy scalability.
- **📡 Live Event Fetching**: Uses `ky` for efficient API requests and automatic JSON parsing.
- **✅ Unit & E2E Testing**: `Vitest, Jest, Supertest, and Playwright` ensure high code quality.
- **🛠️ Error Handling & Retry Logic**: Graceful API error handling and user notifications.
- **🧹 Database Seeding & Migrations**: `Drizzle Kit` manages database schema and migrations.
- **📜 Logging & Debugging**: [Postman](server/postman/events.postman_collection.json) collection, `Pino` for structured logs and debugging.
- **🧪 Test Coverage & CI Integration**: Automated test execution with coverage reports.

## Tech Stack
- **Client**: React 19, Zustand, Vite, Material UI, I18next, React Query
- **Server**: Node.js, Express, Typescript, Pino, Zod
- **Database**: Postgres, Drizzle
- **Testing**: Playwright, Vitest, Supertest, Jest
- **Deployment**: Docker, Docker Swarm
- **Code Quality**: ESLint, Prettier, pre-commit hooks, lint-staged

## Commands

### Installation

Install [Docker](https://docs.docker.com/get-docker/) and NPM dependencies (**Steps 1-2**)

`brew install --cask docker` Install Docker using [brew](https://brew.sh/) example (**Step 1**)

`npm install` Install NPM dependencies (**Step 2**)

### Development

Start app in Development mode with hot reload (**Step 1**).
The app will be available at `http://localhost:4200`.

`npm run start` Start client, server, Postgres service and prepares database with mock data (**Step 1**)

`npm run start:client` Start client

`npm run start:server` Start server

`npm run postgres:start` Start Postgres service, creates table and seed with mock data

`npm run postgres:service` Start Postgres service

`npm run postgres:prepare` Create Postgres table and seed it with mock data

`npm run postgres:stop` Stop Postgres service

### Testing

Run the app in Development mode (**Step 1**) or Production mode (**Steps 1-3**) first

`npm run test` Run client, server and e2e tests

`npm run test:docker` Docker build, deploy and test

`npm run test:e2e` Run end-to-end tests

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

Start app in Production mode in Docker environment (**Steps 1-3**). 
The app will be available at `http://localhost:4200`.

`npm run docker:build` Build Docker images (**Step 1**)

`npm run docker:deploy` Deploy Docker containers (**Step 2**)

`npm run postgres:migrate` Create Postgres table (**Step 3**)

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