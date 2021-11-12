/* eslint-disable no-console */
'use strict';

const config = require('./config');
const knexMigrate = require('knex-migrate');

const log = ({ action, migration }) =>
  console.log('Doing ' + action + ' on ' + migration);

async function migrate() {
  try {
    return await knexMigrate('up', { to: config.latestMigration }, log);
  } catch (e) {
    const migrationsAlreadyRun = e.message.includes('Migration is not pending');

    if (!migrationsAlreadyRun) {
      throw e;
    }
    return console.log('Migrations have already run!');
  }
}

async function rollback() {
  return await knexMigrate('down', {}, log);
}

module.exports = {
  migrate,
  rollback
};
