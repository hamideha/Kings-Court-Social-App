'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'profilePicture',
      Sequelize.STRING,
      {
        allowNull: true,
        validate: {
          isUrl: true
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'profilePicture'
    );
  }
};
