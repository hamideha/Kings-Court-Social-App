require('./.pnp.js').setup(); // Required to be able to use Plug'n'Play instead of node_modules (LOOK INTO PNP SETUP)
require('dotenv').config()
const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const { types, resolvers } = require('./schemas/index');
const permissions = require('./schemas/schema-shields')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware')
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const app = express();

app.use(cookieParser(process.env.AUTH_SECRET))
app.use(passport.initialize())
app.use(passport.session());

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    res.json({ hello: "World" })
})

const schema = applyMiddleware(
    makeExecutableSchema({
        typeDefs: types,
        resolvers: resolvers,
    }),
    permissions
);

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
        // if (!req.headers.authorization) throw new AuthenticationError('you must be logged in');
        return { req, res }
    },
});

//config taken from Apollo docs: https://www.apollographql.com/docs/apollo-server/data/subscriptions/
//and https://github.com/apollographql/subscriptions-transport-ws
server.applyMiddleware({ app, path: '/graphql', cors: false });
const httpServer = createServer(app);

new SubscriptionServer(
    {
        execute,
        subscribe,
        schema,
    },
    {
        server: httpServer
    }
);

httpServer.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);
});
