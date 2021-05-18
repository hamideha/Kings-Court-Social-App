const { User } = require('../models/index')
const { authenticateGoogle } = require('../auth/passport')
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const { gql } = require('apollo-server-express');

module.exports.authTypeDef = gql`
type AuthResponse {
  isLoggedIn: Boolean!
  user: User
}
extend type Query {
  isAuthed: AuthResponse!
}
extend type Mutation {
  authUser(accessToken: String!): User!,
  logoutUser: Boolean!
}
  `;

module.exports.authResolver = {
    Query: {
        isAuthed: async (obj, args, { req, res }) => {
            const token = req.cookies.token
            if (token) {
                try {
                    const payload = jwt.verify(token, process.env.AUTH_SECRET)
                    return { user: User.findByPk(payload.userId), isLoggedIn: true }
                } catch (err) {
                    return err
                }
            };
            return { user: new AuthenticationError('Please login to continue using the website!'), isLoggedIn: false }
        }
    },
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
                        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
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
