const { sequelize, DataTypes } = require('../models/index')
const Message = require('../models/message')

const { gql } = require('apollo-server-express');

module.exports.messageTypeDef = gql`
type Message {
  content: String,
  likes: Int,
  user: User!
}
extend type Mutation {
  deleteMessage(id: Int): Boolean,
  addMessage(content: String, userId: Int, likes: Int): Message
}
`;

module.exports.messageResolver = {
    Query: {
        Messages: async () => { return Message(sequelize, DataTypes).findAll() },
    },
    Mutation: {
        // A GraphQl resolver follows this structure for arguments human(obj, args, context, info)
        // args is the arguments passed in your query/mutation
        addMessage: async (obj, args) => {
            const created = Message(sequelize, DataTypes).create({ ...args })
            return created
        },
        deleteMessage: async (obj, args) => {
            const deleted = Message(sequelize, DataTypes).destroy({
                where: { id: args.id }
            })
            return deleted
        }
    }
}
