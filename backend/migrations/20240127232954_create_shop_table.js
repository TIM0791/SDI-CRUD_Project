/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('Admin', table => {
      table.increments('id');
      table.string('First_Name', 26);
      table.string('Last_Name', 26);
      table.string('Username');
      table.string('Password');
    })
    .createTable('Item', table => {
      table.increments('id');
      table.bigint('AdminID').unsigned();
      table.foreign('AdminID').references('Admin.id').onDelete('CASCADE');
      table.string('Name');
      table.string('Description');
      table.mediumint('Quantity');
      table.string('Image');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Item')
    .dropTableIfExists('Admin')
};
