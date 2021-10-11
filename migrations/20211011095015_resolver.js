exports.up = function(knex) {
  return knex.schema.table('resolver', table => {
      table.boolean('success').notNullable();
      table.boolean('duplicate');
      table.string('case_id_for_duplicate');
      table.string('external_id_for_duplicate');
  });
};

exports.down = function(knex) {
  return knex.schema.table('resolver', table => {
      table.dropColumn('success');
      table.dropColumn('duplicate');
      table.dropColumn('case_id_for_duplicate');
      table.dropColumn('external_id_for_duplicate');
  });
};
