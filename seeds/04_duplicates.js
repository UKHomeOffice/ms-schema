'use strict';

// eslint-disable-next-line func-names
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('duplicates').del()
    // eslint-disable-next-line func-names
    .then(function () {
      // Inserts seed entries
      return knex('duplicates').insert([
        {id: 1, externalID: '1111', caseID: 'aaaa'},
        {id: 2, externalID: '2222', caseID: 'bbbb'}
      ]);
    });
};
