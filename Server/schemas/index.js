const { gql } = require('apollo-server-express');
const { userTypeDef, userResolver } = require('./user')
const { messageTypeDef, messageResolver } = require('./message')
const { authTypeDef, authResolver } = require('./auth')
const merge = require('deepmerge')

const typeDefs = gql`
type Query {
  _empty: String,
}

type Mutation {
  _empty: String
}
`;

module.exports.types = [typeDefs, userTypeDef, messageTypeDef, authTypeDef]
module.exports.resolvers = merge.all([userResolver, messageResolver, authResolver])