"use strict";
/*npx sequelize-cli db:seed:all - command for seeding data
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        id: 0,
        name: "client",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
      {
        id: 1,
        name: "clinic",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
