const { User } = require('../models/index')

const { gql, PubSub } = require('apollo-server-express');

const pubsub = new PubSub()

module.exports.chatTypeDef = gql`
type ChatMessage {
  content: String!,
  user: User!,
  id: Int!,
}
extend type Query {
  chats: [ChatMessage!]
}
extend type Mutation {
  postChat(user: Int!, content: String!): Boolean!
}
extend type Subscription {
  chats: [ChatMessage!]
}
`;

module.exports.chatResolver = {
    Subscription: {
    }
}
