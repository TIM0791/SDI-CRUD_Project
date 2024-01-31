/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('Item').del()
  await knex('Item').insert([
    {id: 17, AdminID: 1, Name: 'Tigers Eye', Description: 'Manifestation', Quantity: 10, Image: 'https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3RpZ2Vycy1leWUtbWVhbmluZy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH0sInRvRm9ybWF0IjoiYXZpZiJ9fQ=='},
    {id: 18, AdminID: 1, Name: 'Moonstone', Description: 'Manifestation', Quantity: 20, Image: 'https://t4.ftcdn.net/jpg/05/41/13/83/240_F_541138390_paKecrOAR6jh88TlBX9BZ4qZxInLKQTH.jpg'},
    {id: 19, AdminID: 2, Name: 'Pyrite', Description: 'Healing', Quantity: 300, Image: 'https://media.australian.museum/media/dd/images/04_D48008_Pyrite_SH.71bc4b3.width-1200.efe3c9f.jpg'}
  ]);
};