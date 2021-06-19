const { Message } = require('../models/index')

const { gql } = require('apollo-server-express');
const { pubsub } = require('./pubsub')

module.exports.messageTypeDef = gql`
type Message {
  content: String!,
  likes: Int!,
  createdAt: Date!,
  user: User!,
  id: Int!,
  newField: Boolean!
}
type PaginateMessages {
  rows: [Message!]!,
  hasMore: Boolean!
}
extend type Query {
  PaginateMessages(limit: Int!, offset: Int!): PaginateMessages!
  Messages: [Message!]!,
  Message(id: Int): Message!
}
extend type Mutation {
  deleteMessage(id: Int): Boolean!,
  addMessage(content: String, userId: Int): Message!,
}
extend type Subscription {
  PaginateMessages(limit: Int!, offset: Int!): PaginateMessages!,
  messageAdded: Message!  
}
`;

module.exports.messageResolver = {
    Message: {
        user: async (message) => {
            return message.getUser()
        },
    },
    Query: {
        PaginateMessages: async (obj, args) => {
            const data = await Message.findAndCountAll({
                limit: args.limit,
                offset: args.offset,
                order: [['createdAt', 'DESC']]
            })

            return { rows: data.rows, hasMore: args.offset < data.count - 1 }
        },
        Messages: async () => { return Message.findAll({ order: [['createdAt', 'ASC']] }) },
        Message: async (obj, args) => { return Message.findByPk(args.id) }
    },
    Mutation: {
        // A GraphQl resolver follows this structure for arguments human(obj, args, context, info)
        // args is the arguments passed in your query/mutation
        addMessage: async (obj, args) => {
            const created = Message.create({ ...args })
            pubsub.publish('ADDED_MESSAGE', { addMessage: created });
            return created
        },
        deleteMessage: async (obj, args) => {
            const deleted = Message.destroy({
                where: { id: args.id }
            })
            return deleted
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: () => {
                return pubsub.asyncIterator(['ADDED_MESSAGE'])
            },
            resolve: async (payload, args, context, info) => {
                const data = await payload.addMessage
                return data;
            },
        }
    }
}
