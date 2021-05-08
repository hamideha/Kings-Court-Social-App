const { User } = require('../models/index')
const { authenticateGoogle } = require('../auth/passport')
const jwt = require('jsonwebtoken');

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
  messages: [Message!]!
}
extend type Query {
  Users: [User],
  User(id: Int): User 
}
extend type Mutation {
  updateUser(firstName: String, lastName: String, email: String): User,
  deleteUser(id: Int): Boolean,
  addUser(firstName: String, lastName: String, email: String): User,
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
        const { data, info } = await authenticateGoogle(req, res);

        if (data) {
          const user = await User.prototype.upsertUser(data)

          if (user) {
            const token = jwt.sign({
              userId: user[0].id,
              email: user[0].email
            }, process.env.AUTH_SECRET, { expiresIn: '1h' });
            const cookie = res.cookie('token', token, { maxAge: 90000, httpOnly: true })

            return { token }
          }
        }
      }
      catch (err) {
        return err
      }
    }
  }
}
