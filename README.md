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

### Adding new migrations
Add a new migration running
```
knex migrate:make <migration_name>
```
Also ensure to add new seed data for local DBs in the seed folder

Then update the package.json and peg the db:migrate script to the latest version you want to run the next migration to. In this example it will run all migrations up to the `20211011151008_user.js` migration.
```
"db:migrate": "knex-migrate up --to 20211011151008_user",
```

### Migrations Audit

12th November 2021
- 20211011151008_user.js

Prior to 12th November 2021
- 20201002165609_user.js
