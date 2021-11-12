
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('resolver').del()
    .then(function () {
      // Inserts seed entries
      return knex('resolver').insert([
        {id: 1, success: 'true'},
        {id: 2, success: 'true'},
        {id: 3, success: 'true'}
      ]);
    });
};
