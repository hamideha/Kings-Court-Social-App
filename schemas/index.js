const { gql } = require('apollo-server-express');
const { userTypeDef, userResolver } = require('./user')
const merge = require('deepmerge')

const typeDefs = gql`
type Query {
  Users: [User],
}
`;

module.exports.types = [typeDefs, userTypeDef]
module.exports.resolvers = merge.all([userResolver])