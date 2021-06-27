"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "name", Sequelize.STRING, {
      allowNull: false,
    });
    await queryInterface.addColumn("Products", "price", Sequelize.INTEGER, {});
    await queryInterface.addColumn("Products", "details", Sequelize.STRING);
    await queryInterface.addColumn("Products", "image", Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "name");
    await queryInterface.removeColumn("Products", "price");
    await queryInterface.removeColumn("Products", "details");
    await queryInterface.removeColumn("Products", "image");
  },
};
