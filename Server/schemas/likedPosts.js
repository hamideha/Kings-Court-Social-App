const { Message, User, LikedPosts } = require('../models/index')

const { gql } = require('apollo-server-express');

module.exports.likesTypeDef = gql`
extend type Query {
  usersLikes(userId: Int!): [Message!]!
  messageLikers(messageId: Int!): [User!]!
}
extend type Mutation {
  likeMessage(userId: Int!, messageId: Int!): Int!
}
`;

module.exports.likesResolver = {
    Query: {
        usersLikes: async (obj, args) => {
            const user = await User.findByPk(args.userId)
            const usersLikes = await user.getLikedPosts()
            const messagesLikedByUser = usersLikes.reduce((accumulator, likedMessage) => {
                const message = Message.findByPk(likedMessage.messageId)
                return [...accumulator, message]
            }, [])
            return messagesLikedByUser
        },
        messageLikers: async (obj, args) => {
            const message = await Message.findByPk(args.messageId)
            const messagesLikers = await message.getLikedPosts()
            const usersThatLikedMessage = messagesLikers.reduce((accumulator, likedMessage) => {
                const user = User.findByPk(likedMessage.userId)
                return [...accumulator, user]
            }, [])
            return usersThatLikedMessage
        },
    },
    Mutation: {
        likeMessage: async (obj, { userId, messageId }) => {
            const newLike = await LikedPosts.findOrCreate({
                where: { userId: userId, messageId: messageId },
                defaults: {
                    userId: userId,
                    messageId: messageId,
                }
            })
            const likedMessage = await Message.findByPk(newLike[0].messageId)
            if (newLike[1]) {
                const message = await likedMessage.increment('likes')
                return message.likes
            }
            return likedMessage.likes
        }
    },
}
