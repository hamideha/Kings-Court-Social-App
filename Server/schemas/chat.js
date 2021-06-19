const { User } = require('../models/index')

const { gql } = require('apollo-server-express');
const { pubsub } = require('./pubsub')

const chats = []
const CHAT_CHANNEL = 'CHAT_CHANNEL'

module.exports.chatTypeDef = gql`
type ChatMessage {
  content: String!,
  user: User!,
  id: Int!,
  createdAt: Date!
}
extend type Query {
  chats: [ChatMessage!]
}
extend type Mutation {
  postChat(userId: Int!, content: String!): ChatMessage!
}
extend type Subscription {
  chatSent: ChatMessage!
}
`;

module.exports.chatResolver = {
  Query: {
    chats: async () => {
      return chats
    }
  },
  Mutation: {
    postChat: async (obj, { userId, content }) => {
      const user = await User.findByPk(userId)
      const chat = { id: chats.length + 1, user, content, createdAt: new Date() }

      chats.push(chat)
      pubsub.publish(CHAT_CHANNEL, { chatSent: chat })

      return chat
    }
  },
  Subscription: {
    chatSent: {
      subscribe: () => {
        return pubsub.asyncIterator([CHAT_CHANNEL])
      }
    }
  }
}
