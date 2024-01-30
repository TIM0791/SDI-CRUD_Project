/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
  const adminHash = bcrypt.hashSync("admin", 13);
  const otherHash = bcrypt.hashSync("arnie_palmie", 13);

  await knex('User').del()
  await knex('User').insert([
    {id: 1, First_Name: 'Aaron', Last_Name: 'Admin', Username: 'Admin@admin.com', Password: adminHash},
    {id: 2, First_Name: 'Christinith', Last_Name: 'Manager', Username: 'manage@admin.com', Password: otherHash}
  ]);
};