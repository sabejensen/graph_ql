const { ApolloServer, gql } = require('apollo-server');
const pkdata = require('./pkmn/pkmn.json')

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const expressPlayground = require('graphql-playground-middleware-express').default

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Pokemon {
    id: String
    name: String
    classification: String
  }

  type Query {
    pokemon: [Pokemon]
  }
`;

const pokemon = [];

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

console.log(pkdata.length)

for(let i = 0; i < pkdata.length; i++) {
    let currentPk = {
        id: pkdata[i].id,
        name: pkdata[i].name,
        classification: pkdata[i].classification
    }
    pokemon.push(currentPk)

}
  

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      pokemon: () => pokemon.id,
    },
};

console.log('PRISMA ', resolvers)

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

const app = express()

app.use(
    '/graphql',
    graphqlHTTP((req) => ({
        schema,
        rootValue: resolvers,
    }))
)

const port = 8080

app.get('/', expressPlayground({ endpoint: '/graphql' }))

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
})