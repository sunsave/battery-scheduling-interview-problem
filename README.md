# Battery scheduling

A NestJS API and a Next.js web app for viewing a customer's battery.

## Prerequisites

- [mise](https://mise.jdx.dev/), activated in your shell, which installs the Node version in `mise.toml` (Node 24)
- Git

## Setup

```sh
mise trust
mise install
npm install
```

## Running

```sh
npm run dev
```

This migrates and seeds the development database, then starts:

- the API on http://localhost:3001
- the web app on http://localhost:3000

The customer page shows a seeded customer's battery:
http://localhost:3000/customer/00000000-0000-0000-0000-000000000001

The seeded customers have IDs `00000000-0000-0000-0000-000000000001` to `00000000-0000-0000-0000-000000000004`. Customer `...0004` has no battery.

### Database

In development the API uses SQLite through Prisma. In production we use Postgres instead.

Run these from `apps/api`:

| Command              | What it does                                          |
| -------------------- | ----------------------------------------------------- |
| `npm run db:setup`   | Apply migrations and seed (run by `npm run dev`)      |
| `npm run db:migrate` | Create and apply a migration after editing the schema |
| `npm run db:seed`    | Seed the database                                     |
| `npm run db:reset`   | Drop the database, re-apply migrations and seed       |

The schema is in `apps/api/prisma/schema.prisma`.

## Project layout

- `apps/api`: NestJS API
- `apps/web`: Next.js web app
- `docs/`: OpenAPI specs for the external APIs

## Tests

From the repository root:

```sh
npm run test       # all tests
npm run check      # typecheck, lint, API spec lint and all tests
```

To run one layer, use the workspace scripts, for example `npm run test --workspace=api` (unit) or `npm run test:e2e --workspace=api` (end-to-end).

## API specs

`docs/` contains OpenAPI specs for two external APIs:

- `docs/optimiser.openapi.yaml`: the Optimiser API
- `docs/powercell.openapi.yaml`: the Powercell API

To browse both specs, run:

```sh
npm run docs:preview
```

Then open http://localhost:8080 and pick an API from the selector at the top of the page. The page (`docs/index.html`) uses [Scalar](https://scalar.com), loaded from a CDN, so you'll need an internet connection.
