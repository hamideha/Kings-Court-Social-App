const { User } = require('../models/index')
const { authenticateFacebook } = require('../auth/passport')

const { gql } = require('apollo-server-express');

module.exports.userTypeDef = gql`
type AuthResponse {
  token: String
  name: String
}
type User {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  messages: [Message!]!
}
extend type Query {
  Users: [User],
  User(id: Int): User 
}
extend type Mutation {
  updateUser(firstName: String, lastName: String, email: String, password: String): User,
  deleteUser(id: Int): Boolean,
  addUser(firstName: String, lastName: String, email: String, password: String): User,
  authUser(accessToken: String!): AuthResponse!
}
  `;

module.exports.userResolver = {
  User: {
    messages: async (user) => {
      return user.getMessages()
    }
  },
  Query: {
    Users: async () => { return User.findAll() },
    User: async (obj, args) => { return User.findByPk(args.id) }
  },
  Mutation: {
    // A GraphQl resolver follows this structure for arguments human(obj, args, context, info)
    // args is the arguments passed in your query/mutation
    updateUser: async (obj, args) => {
      const updated = User.update({ ...args }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      return updated.then(data => data[1]).catch(err => false)
    },
    addUser: async (obj, args) => {
      const created = User.create({ ...args })
      return created
    },
    deleteUser: async (obj, args) => {
      const deleted = User.destroy({
        where: { id: args.id }
      })
      return deleted
    },
    authUser: async (obj, args, { req, res }) => {
      req.body = {
        ...req.body,
        access_token: args.accessToken,
      };
      try {
        // data contains the accessToken, refreshToken and profile from passport
        const { data, info } = await authenticateFacebook(req, res);
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}