"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("facilities", [
      {
        facility_id: 100,
        facility_name: "Facility A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        facility_id: 101,
        facility_name: "Facility B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        facility_id: 102,
        facility_name: "Facility C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("facilities", {});
  },
};
