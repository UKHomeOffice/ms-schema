'use strict';

const config = require('./config');
const knexMigrate = require('knex-migrate');

const log = ({ action, migration }) =>
  console.log('Doing ' + action + ' on ' + migration);

async function migrate() {
  try {
    await knexMigrate('up', { to: config.latestMigration }, log);
  } catch (e) {
    const migrationsAlreadyRun = e.message.includes('Migration is not pending');

    if (migrationsAlreadyRun) {
      return console.log('Migrations have already run!');
    }
    throw e;
  }
}

async function rollback() {
  await knexMigrate('down', {}, log);
}

module.exports = {
  migrate,
  rollback
};
