"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("animals", [
      {
        id: 0,
        name: "cat",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
      {
        id: 1,
        name: "dog",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        updatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("animals", null, {});
  },
};
