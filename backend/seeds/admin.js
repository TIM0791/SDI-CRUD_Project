/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcrypt");

exports.seed = async function(knex) {
  const adminHash = bcrypt.hashSync("admin", 13);
  const otherHash = bcrypt.hashSync("arnie_palmie", 13);

  await knex('Admin').del()
  await knex('Admin').insert([
    {id: 20, First_Name: 'Aaron', Last_Name: 'Admin', Username: 'Admin@admin.com', Password: adminHash},
    {id: 21, First_Name: 'Christinith', Last_Name: 'Manager', Username: 'manage@admin.com', Password: otherHash}
  ]);
};