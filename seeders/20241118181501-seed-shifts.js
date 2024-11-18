"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("shifts", [
      {
        shift_id: 1,
        facility_id: 100,
        shift_date: "2022-10-01",
        start_time: "07:00:00",
        end_time: "15:00:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shift_id: 2,
        facility_id: 100,
        shift_date: "2022-10-01",
        start_time: "14:00:00",
        end_time: "23:00:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shift_id: 3,
        facility_id: 100,
        shift_date: "2022-10-03",
        start_time: "07:00:00",
        end_time: "19:00:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shift_id: 4,
        facility_id: 102,
        shift_date: "2022-10-02",
        start_time: "23:00:00",
        end_time: "07:30:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("shifts", {});
  },
};
