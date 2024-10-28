# Weblium test task

This project uses Node.js's newest experimental TypeScript support, which means
your Node version must be AT LEAST 22.7.

For instructions on how to run a specific project (cli, dashboard, main) please consult
respective READMEs.

## Docker

Running the whole app in docker is as easy as running

```bash
docker-compose up
```

from root directory.

If you wish to run a single service, just run

```bash
npm run compose --workspace=main/dashboard
```

The docker compose contains a mongodb instance, which is shared between the two services,
guaranteeing data consistency when using both together and interchangeably.

### WARNING

Docker builds are currently broken due to an NPM bug. See [this](https://github.com/nodejs/docker-node/issues/1946#issuecomment-2442146766).
