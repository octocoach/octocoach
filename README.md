<p align="center">
  <img src="assets/octocoach_logo.png" alt="OctoCoach Logo" width="200"/>
</p>

<h1 align="center">OctoCoach</h1>

<p align="center">
  A TypeScript-based platform for managing AZAV coaching businesses. This monorepo contains multiple applications and packages that work together to provide a comprehensive coaching management solution.
</p>

## Project Structure

This is a monorepo managed with pnpm workspaces, containing:

### Applications

- [`apps/web`](apps/web): The main web application built with Next.js

  - Handles the primary user interface
  - Integrates with Daily.co for video functionality
  - Includes analytics and real-time features
  - Uses AI capabilities through OpenAI integration

- [`apps/video`](apps/video): Video generation service
  - Built with Remotion for programmatic video creation
  - Includes support for animations and transitions
  - Integrates with AI services for content generation

### Packages (Shared Libraries)

The repository includes several shared packages that are used across applications:

- [`@octocoach/auth`](packages/auth): Authentication utilities
- [`@octocoach/charts`](packages/charts): Charting and visualization components
- [`@octocoach/daily`](packages/daily): Daily.co integration utilities
- [`@octocoach/db`](packages/db): Database access layer
- [`@octocoach/i18n`](packages/i18n): Internationalization utilities
- [`@octocoach/ui`](packages/ui): Shared UI components
- [`@octocoach/tshelpers`](packages/tshelpers): TypeScript utility types and helpers
- [`@octocoach/typescript-config`](packages/typescript-config): Shared TypeScript configuration

## Development Setup

### Prerequisites

- [Docker Desktop](https://docs.github.com/en/codespaces/developing-in-codespaces/getting-started-with-github-codespaces#prerequisites) (Windows/macOS) or Docker Engine (Linux)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

That's it! All other dependencies (Node.js, pnpm, etc.) are handled within the development container.

### Development Environment

The project uses DevContainers for a consistent development environment. The setup includes:

1. Three main services:

   - `app`: Main application container
   - `db`: PostgreSQL database
   - `db_proxy`: WebSocket proxy for database connections

2. Exposed ports:
   - 3000: Web application
   - 5433: Database WebSocket proxy
   - 6432: PostgreSQL database

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/octocoach/octocoach.git
```

2. Open in VS Code:

```bash
code octocoach
```

3. When prompted, click "Reopen in Container", or:
   - Press F1 or Ctrl/Cmd + Shift + P
   - Type "Dev Containers: Reopen in Container"
   - Press Enter

The container will automatically:

- Set up the development environment
- Install all dependencies
- Configure the database
- Prepare the development servers

To learn more about working with Dev Containers, see the [official documentation](https://code.visualstudio.com/docs/devcontainers/containers).

### Starting the Development Server

Once the container is ready:

```bash
pnpm dev
```

### Included VS Code Extensions

The development container comes pre-configured with:

- Prettier for code formatting
- Docker tools
- SQL Tools with PostgreSQL support
- TypeScript error highlighting

## Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications and packages
- `pnpm lint`: Run linting across all projects
- `pnpm format`: Format all files using Prettier
- `pnpm test`: Run tests using Vitest

## Technical Stack

- **Frontend**: Next.js, React
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Video Processing**: Remotion
- **AI Integration**: OpenAI
- **Containerization**: Docker
- **Package Management**: pnpm
