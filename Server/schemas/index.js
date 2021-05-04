const { gql } = require('apollo-server-express');
const { userTypeDef, userResolver } = require('./user')
const { messageTypeDef, messageResolver } = require('./message')
const merge = require('deepmerge')

const typeDefs = gql`
type Query {
  _empty: String,
}

type Mutation {
  _empty: String
}
`;

module.exports.types = [typeDefs, userTypeDef, messageTypeDef]
module.exports.resolvers = merge.all([userResolver, messageResolver])