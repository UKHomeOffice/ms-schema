
exports.up = function (knex) {
  return knex.schema.table('reports', table => {
    table.string('submitted_at', 128);
  });
};

exports.down = function (knex) {
  return knex.schema.table('reports', table => {
    table.dropColumn('submitted_at');
  });
};
