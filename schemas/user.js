const { User } = require('../models/index')

const { gql } = require('apollo-server-express');

module.exports.userTypeDef = gql`
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
  addUser(firstName: String, lastName: String, email: String, password: String): User
}
  `;

module.exports.userResolver = {
  User: {
    async messages(user) {
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
    }
  }
}
