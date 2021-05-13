require('./.pnp.js').setup(); // Required to be able to use Plug'n'Play instead of node_modules (LOOK INTO PNP SETUP)
require('dotenv').config()
const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { types, resolvers } = require('./schemas/index');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const app = express();

app.use(cookieParser())
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
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

// app.listen({ port: 4000 }, () =>
//     console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
// )

httpServer.listen(4000);
console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
console.log(`Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);