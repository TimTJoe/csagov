("use strict");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 3,
          isAlpha: true
        }
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 4,
          isAlpha: true
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        validate: {
          min: 5,
          isAlphanumeric: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 8,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
