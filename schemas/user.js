const { sequelize, DataTypes } = require('../models/index')
const User = require('../models/user')

const { gql } = require('apollo-server-express');

module.exports.userTypeDef = gql`
type User {
  firstName: String,
  lastName: String,
  email: String,
  password: String,

}
type Mutation {
  updateUser(firstName: String, lastName: String, email: String, password: String): User,
  deleteUser(id: Int): Boolean,
  addUser(firstName: String, lastName: String, email: String, password: String): User
}
  `;

module.exports.userResolver = {
  Query: {
    Users: async () => { return User(sequelize, DataTypes).findAll() },
  },
  Mutation: {
    // A GraphQl resolver follows this structure for arguments human(obj, args, context, info)
    // args is the arguments passed in your query/mutation
    updateUser: async (obj, args) => {
      const updated = User(sequelize, DataTypes).update({ ...args }, {
        where: { id: args.id },
        returning: true,
        plain: true
      })
      return updated.then(data => data[1]).catch(err => false)
    },
    addUser: async (obj, args) => {
      const created = User(sequelize, DataTypes).create({ ...args })
      return created
    },
    deleteUser: async (obj, args) => {
      const deleted = User(sequelize, DataTypes).destroy({
        where: { id: args.id }
      })
      return deleted
    }
  }
}
