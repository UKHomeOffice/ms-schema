# MS Schema

A simple container to run migrations on the MS audit database

This will set up required users and tables in order for audit data to be reported from nrm-hof and icasework resolver which can later be read by a grafana.

## DB Users
```
hof      | User for the modern slavery hof application to post audit data
grafana  | User for the dashboard to get audit data
resolver | User for the icasework resolver to post audit data
reports  | User for save-return-lookup-ui, save-return-api, save-return-email-alerts services to get and post session data
```

### Environment variables

You'll need to set the following env vars:

```
HOF_USER_PASS       | Password for the hof USER
RESOLVER_USER_PASS  | Password for the resolver USER
GRAFANA_USER_PASS   | Password for the graphana USER
REPORTS_USER_PASS   | Password for the reports USER
NODE_ENV            | So knex knows what config to run against
DB_HOST             | The postgres db host
DB_USER             | The postgres db username
DB_PASS             | The postgres db password
DB_NAME             | The postgres db name
```

## Local Setup
The migrations and seeds folders are used by knex to setup a local DB with dummy information for testing the service. These are not used in production where it is assumed a separate DB is setup for knex to connect to that is already setup.

Run the following commands to setup a test DB:
```
brew install postgres
brew services start postgresql
psql postgres
CREATE ROLE knex WITH LOGIN PASSWORD 'knex';
ALTER ROLE knex WITH SUPERUSER;
CREATE DATABASE knex_session;
\q
```
If you download Postico for Mac (https://eggerapps.at/postico/), you can then inspect your postgres DB for example and look at the test entries inserted into the test table 'Reports'.

You then need to use a knexfile with migrations and seeds folders to populate your database.
The ms-schema repo which is used for migrations in the Modern Slavery service (https://github.com/UKHomeOffice/ms-schema) can be used as a test example and is included in this project. You can run
```
yarn run db:setup
```
from that repo to setup your database.

### Adding new migrations
Add a new migration running
```
knex migrate:make <migration_name>
```
Also ensure to add new seed data which can be used for local DB testing in the seed folder.

Then update the config.js file to specify the latest migration file to run to. Then document this in the audit log below.

When new work is merged to master, update the digest for the kube job in the [modern-slavery service](https://github.com/UKHomeOffice/modern-slavery) which should be the commit SHA. The digest is also logged in the Drone console when the image is published to Quay. E.g.:
```
8b74079b6dbfce20c0dbd683b554ec6c7c0ddfbb: digest:
```

Finally remember to update the package.json version, tag the repo with the same version, i.e. `v1.2.0`, create a release note and publish a new npm module:
```
npm publish
```
Which then should be updated in [save-return-email-alerts](https://github.com/UKHomeOffice/save-return-email-alerts), [save-return-lookup-ui](https://github.com/UKHomeOffice/save-return-lookup-ui) and [save-return-api](https://github.com/UKHomeOffice/save-return-api). This is so they can test the latest migrations on a local DB if needs be.

### Migrations Audit

18th August 2025
- 20250813160020_add_submitted_at.js

12th November 2021
- 20211011151008_user.js

Prior to 12th November 2021
- 20201002165609_user.js
