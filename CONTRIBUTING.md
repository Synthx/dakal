# Contributing to Dakal

Thank you for your interest in contributing to Dakal! We welcome contributions from the community to help make this D. Retro server emulator even better.

As the project is in a pre-alpha state, architecture is subject to change, but we value your input and help.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting a Pull Request](#submitting-a-pull-request)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct (standard professional and respectful behavior).

## Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Docker](https://www.docker.com/) and Docker Compose (for the database)

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/Synthx/dakal.git
    cd dakal
    ```
3.  **Install dependencies**:
    ```bash
    bun install
    ```
4.  **Set up the environment**:
    - Follow the setup instructions in the [README.md](README.md) to start the database and run migrations.

## Development Workflow

Dakal is a monorepo managed with Bun workspaces.

- `packages/core`: Core logic, networking, and shared utilities.
- `packages/login`: Login server implementation.

When working on a feature:

- If it's a general utility or networking logic, it likely belongs in `packages/core`.
- If it's specific to authentication or account management, it likely belongs in `packages/login`.

### Useful Commands

From the root directory:

- `bun run lint`: Runs Prettier, ESLint, and Type checking across the whole project.
- `bun run format`: Automatically formats the code using Prettier.
- `bun run test`: Runs all tests across all packages.

## Coding Standards

To maintain consistency across the codebase, please follow these guidelines:

- **TypeScript**: Use TypeScript for all new code.
- **Formatting**: We use [Prettier](https://prettier.io/). Run `bun run format` before committing.
- **Linting**: We use [ESLint](https://eslint.org/). Ensure `bun run lint` passes without errors.
- **Naming**: Use camelCase for variables and functions, PascalCase for classes and interfaces.
- **Idiomatic Code**: Follow the existing patterns in the codebase (e.g., how messages are handled, how database repositories are structured).

## Testing

We use [Bun's native test runner](https://bun.sh/docs/cli/test).

- Always write unit tests for new features or bug fixes.
- Place tests in `.spec.ts` files alongside the code they test (or in a `__test__` directory if appropriate).
- Run tests before submitting a PR:
    ```bash
    bun run test
    ```

## Submitting a Pull Request

1.  **Create a new branch** for your feature or fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
2.  **Make your changes** and ensure they follow the [Coding Standards](#coding-standards).
3.  **Add tests** for your changes and ensure they pass.
4.  **Run linting** to ensure code quality:
    ```bash
    bun run lint
    ```
5.  **Commit your changes** with a descriptive commit message.
6.  **Push to your fork** and **open a Pull Request** against the `main` branch of the original repository.
7.  **Describe your changes** clearly in the PR description, linking any relevant issues.

Thank you for contributing!
