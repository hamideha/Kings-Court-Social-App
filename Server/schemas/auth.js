const { User } = require('../models/index')
const { authenticateGoogle } = require('../auth/passport')
const jwt = require('jsonwebtoken');

const { gql } = require('apollo-server-express');

module.exports.authTypeDef = gql`
type AuthResponse {
  token: String
  name: String
}
extend type Mutation {
  authUser(accessToken: String!): User!,
  logoutUser: Boolean!
}
  `;

module.exports.authResolver = {
    Mutation: {
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
                        res.cookie('token', token, { maxAge: 90000, httpOnly: true })
                        return user[0]
                    }
                }
            }
            catch (err) {
                return err
            }
        },
        logoutUser: async (obj, args, { res }) => {
            res.clearCookie('token')
            return true;
        }
    }
}
