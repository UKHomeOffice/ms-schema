exports.up = function(knex) {
    return knex
        .raw(`
            GRANT INSERT ON duplicates TO resolver;
            GRANT SELECT ON duplicates TO grafana;
        `);
  };
  
  exports.down = function(knex) {
    return knex
        .raw(`
            REVOKE INSERT ON duplicates FROM resolver;
            REVOKE SELECT ON duplicates FROM grafana;
        `);
  };
  