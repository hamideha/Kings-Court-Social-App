'use strict';

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
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
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
        email: profile.emails[0].value,
        profilePicture: profile._json.picture || null
      }
    })
    return newUser
  }

  return User;
};