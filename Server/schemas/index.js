const { gql } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');

const { userTypeDef, userResolver } = require('./user')
const { messageTypeDef, messageResolver } = require('./message')
const { likesTypeDef, likesResolver } = require('./likedPosts')
const { authTypeDef, authResolver } = require('./auth')
const { chatTypeDef, chatResolver } = require('./chat')
const { fileUploadTypeDef, fileUploadResolver } = require('./fileUpload')

const merge = require('deepmerge')

const typeDefs = gql`
scalar Date

type Query {
  _empty: String,
}

type Subscription {
  _empty: String,
}

type Mutation {
  _empty: String
}
`;

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar
};

module.exports.types = [typeDefs, userTypeDef, messageTypeDef, likesTypeDef, authTypeDef, chatTypeDef, fileUploadTypeDef]
module.exports.resolvers = merge.all([userResolver, messageResolver, authResolver, likesResolver, chatResolver, fileUploadResolver, resolvers])