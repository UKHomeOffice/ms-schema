'use strict';

// eslint-disable-next-line func-names
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('duplicates').del()
    // eslint-disable-next-line func-names
    .then(function () {
      // Inserts seed entries
      return knex('duplicates').insert([
        {id: 1, duplicate: 'true', external_id: '1111', case_id: 'aaaa'},
        {id: 2, duplicate: 'false', external_id: '2222'}
      ]);
    });
};
