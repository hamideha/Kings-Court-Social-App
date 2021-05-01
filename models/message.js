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
            allowNull: false
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
    }

    return Message;
};