require('./.pnp.js').setup(); // Required to be able to use Plug'n'Play instead of node_modules (LOOK INTO PNP SETUP)
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const passport = require('passport');
var cookieParser = require('cookie-parser')

const { ApolloServer, makeExecutableSchema, AuthenticationError } = require('apollo-server-express');
const { types, resolvers } = require('./schemas/index');

const app = express();

app.use(cookieParser(process.env.AUTH_SECRET))
app.use(require("express-session")({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session());

app.use(cors({ origin: "*", credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.json({ hello: "World" })
})

const schema = makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers,
});

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
        // if (!req.headers.authorization) throw new AuthenticationError('you must be logged in');
        return { req, res }
    },
});
server.applyMiddleware({ app, path: '/graphql', cors: false, });

app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)