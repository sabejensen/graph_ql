const { ApolloServer, gql } = require('apollo-server');
const pkdata = require('./pkmn/pkmn.json')

const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const expressPlayground = require('graphql-playground-middleware-express').default

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const typeDefs = gql`
  type Pokemon {
    autoId: String
    id: String
    name: String
    classification: String
    sprite: String
  }

  type Query {
    findPokemon: Pokemon,
    firstPokemon: Pokemon,
    createPokemon: Pokemon,
    upsertPokemon: Pokemon,
    resetPokemon: Pokemon
  }
`;

let allPk = []

const getPk = async () => {
  let myPk = await prisma.pokemon.findMany()
  allPk.push(myPk)
}

getPk()


const resolvers = {
    Query: {
      findPokemon: (pkId) => {
        return(prisma.pokemon.findUnique({
          where: {
            autoId: pkId
          }
        }))
      },
      firstPokemon: () => {
        return(prisma.pokemon.findFirst())
      },
      createPokemon: () => {
        return(prisma.pokemon.create({
          data: {
            name: 'Squirtle Jr.',
            id: '152',
            classification: 'The best pokemon'
          }
        }))
      },
      upsertPokemon: () => {
        return(prisma.pokemon.create({
          data: {
            name: 'Squirtle Sr.',
            id: '153',
            classification: 'The worst pokemon'
          }
        }))
      },
      resetPokemon: () => prisma.pokemon.deleteMany({})
    },
};

console.log('PRISMA ', prisma)


// const app = express()

// app.use(
//     '/graphql',
//     graphqlHTTP((req) => ({
//         schema,
//         rootValue: resolvers,
//     }))
// )

// const port = 8080

// app.get('/', expressPlayground({ endpoint: '/graphql' }))

// app.listen({ port }, () => {
//     console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
// })

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: 4000 });