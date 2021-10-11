
exports.up = function(knex) {
  return knex.schema.createTable('duplicates', table => {
    table.timestamps(true, true)
    table.boolean('duplicate');
    table.string('case_id_for_duplicate');
    table.string('external_id_for_duplicate');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('duplicates');
};
