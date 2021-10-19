
exports.up = function (knex) {
  return knex.schema.createTable('duplicates', table => {
    table.increments();
    table.timestamps(true, true);
    table.boolean('duplicate').notNullable();
    table.string('case_id');
    table.string('external_id').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('duplicates');
};
