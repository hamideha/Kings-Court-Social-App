'use strict';
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    }
  }, {
    modelName: 'User',
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { foreignKey: 'userId', as: 'messages' })
  }

  User.prototype.upsertUser = ({ profile }) => {
    const newUser = User.findOrCreate({
      where: { email: profile.emails[0].value },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
      }
    })
    return newUser
  }

  return User;
};