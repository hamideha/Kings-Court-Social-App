'use strict';

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 248],
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    likes: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    },
  }, {
    modelName: 'Message',
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'userId' })
    Message.hasMany(models.LikedPosts, { foreignKey: "messageId", as: 'likedPosts' });
  }

  return Message;
};