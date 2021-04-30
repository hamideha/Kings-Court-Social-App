require('./.pnp.js').setup(); // Required to be able to use Plug'n'Play instead of node_modules (LOOK INTO PNP SETUP)
const express = require('express');
const cors = require('cors');

const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { types, resolvers } = require('./schemas/index')

const app = express();

app.use(cors({
    origin: true, credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ hello: "World" })
})

const schema = makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers,
});

const server = new ApolloServer({ schema });
server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)