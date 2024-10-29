# Main

This is the project that contains source code of the main web app.

## Running

First, copy over `.env.example` from root folder to this one. Rename it to `.env`.

Then, from project root folder, run:

```bash
npm run dev --workspace=main
```

To run in production mode (the only difference is no `--watch` command), just change the script from `dev` to `prod`.

## Migrations

Migrations are very easy to run, just:

```bash
npm run migrate --workspace=main
```

`migrate` script only exists in `main` workspace. To add a new migration, add a new file, and modify the migrations array of `migrations/index.ts`.

You can also run migrations on server startup by setting `MIGRATE` env variable to `true`.

## Testing

You don't need to configure anything for testing, as there's only unit testing present.
