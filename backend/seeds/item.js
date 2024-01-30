/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('Item').del()
  await knex('Item').insert([
    {id: 1, UserID: 1, Name: 'Tigers Eye', Description: 'Manifestation', Quantity: 10},
    {id: 2, UserID: 1, Name: 'Moonstone', Description: 'Manifestation', Quantity: 20},
    {id: 3, UserID: 1, Name: 'Pyrite', Description: 'Healing', Quantity: 300}
  ]);
};