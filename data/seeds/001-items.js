
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { name: "Iron Sword", durability: 52, enhancement: 3 },
        { name: "Steel Sword", durability: 78, enhancement: 8 },
        { name: "Mythril Sword", durability: 95, enhancement: 15 },
        { name: "Holy Sword", durability: 100, enhancement: 20 }
      ]);
    });
};
