# Dakal

Dakal is a D. Retro simple and modular open source server emulator.

## 📝 About

### ✨ Features

To see all currently implemented features you can go to dedicated list:

- [Login server](packages/login/docs/FEATURES.md)

### 👷 State

The project is in pre-alpha development state, and thus, the architecture is not stable, and will change until v1 is released. It can only be used for testing or development purposes.

### 🗃️ Project Structure

This repository is managed as a monorepo using Bun workspaces:

- `packages/core`: The core library containing networking (TCP), database abstractions (Drizzle), message handling (Registry/Dispatcher), and common utilities.
- `packages/login`: A specialized login server implementation that handles authentication, account management, and server dispatches.
- `packages/server`: Not yet implemented.

### 🧑‍💻 Tech Stack

- **Runtime:** [Bun](https://bun.sh/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Logging:** [Pino](https://github.com/pinojs/pino)
- **Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

### 🏗️ Architecture

```mermaid
graph TD
    Client([GameClient])

    subgraph Dakal
        DB@{ shape: cyl, label: PostgreSQL }
        Login[Login]
        Game[Game]
    end

    Client -- TCP --> Login
    Client -- TCP --> Game

    Login --> DB
    Game --> DB
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- [Docker](https://www.docker.com/) and Docker Compose for running the database.

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Synthx/dakal.git
    cd dakal
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Start the database:**

    ```bash
    docker-compose up -d
    ```

4.  **Environment Variables:**
    Create a `.env` file in `packages/login/` with the following variables:

    ```env
    SERVER_PORT=443
    CLIENT_VERSION=1.29.1
    DATABASE_URL=postgresql://user_dakal:mypassword@localhost:5433/db_dakal
    ```

5.  **Run database migrations:**

    ```bash
    cd packages/login
    bun run db:prepare
    bun run db:migrate
    ```

### Running the Project

To start the login server:

```bash
cd packages/login
bun run start
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Licence

This project is licensed under the LGPLv3 licence. See COPYING and COPYING.LESSER files for details.
