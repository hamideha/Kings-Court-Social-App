'use strict';

module.exports = (sequelize, DataTypes) => {
    const LikedPosts = sequelize.define('LikedPosts', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        messageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Messages',
                key: 'id'
            }
        },
    }, {
        modelName: 'LikedPost',
    });

    LikedPosts.associate = (models) => {
        LikedPosts.belongsTo(models.User, { foreignKey: 'userId' })
        LikedPosts.belongsTo(models.Message, { foreignKey: 'messageId' })
    }

    return LikedPosts;
};