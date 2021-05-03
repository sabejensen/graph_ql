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
    manyPokemon: Pokemon,
    createPokemon: Pokemon,
    upsertPokemon: Pokemon,
    resetPokemon: Pokemon,
  }
  type Mutation {
    deletePokemon(id: String!, autoId: String!): Pokemon
    addPokemon(name: String!, classification: String!, sprite: String!, id: String!): Pokemon
    updatePokemon(name: String!, classification: String!, autoId: String!): Pokemon
  }
`;

let allPk = []

const getPk = async () => {
  let allPk = []
  let myPk = await prisma.pokemon.findMany()
  allPk.push(myPk)
  return(allPk)
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
        return(prisma.pokemon.findFirst({
          orderBy: {
            id: "desc"
          }
        }))
      },
      manyPokemon: async () => {
        const pk = await prisma.pokemon.findMany()
        console.log(pk)
        return pk
      },
      createPokemon: () => {
        return(prisma.pokemon.create({
          data: {
            name: 'Squirtle Jr.',
            id: '152',
            classification: 'The best pokemon',
            sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'
          }
        }))
      },
      upsertPokemon: () => {
        return(prisma.pokemon.create({
          data: {
            name: 'Squirtle Sr.',
            id: '153',
            classification: 'The worst pokemon',
            sprite: 'google.com'
          }
        }))
      },
      resetPokemon: () => prisma.pokemon.deleteMany({})
    },
    Mutation: {
      addPokemon: async (name, classification, sprite, id) => {
        const newPk = await prisma.pokemon.create({
          data: {
            name: classification.name,
            classification: classification.classification,
            sprite: classification.sprite,
            id: classification.id,
          }
        })
        setTimeout(() => {
          return newPk
        }, 1000)
      },
      deletePokemon: async (id, autoId) => {
        const deletedPk = await prisma.pokemon.delete({
          where: {
            autoId: autoId.autoId
          }
        })
        setTimeout(() => {
          return deletedPk
        }, 1000)
      },
      updatePokemon: async (name, classification, autoId) => {
        const updatedPk = await prisma.pokemon.update({
          where: {
            autoId: classification.autoId
          },
          data: {
            name: classification.name,
            classification: classification.classification
          }
        })
        setTimeout(() => {
          return updatedPk
        }, 1000)
      }
    }
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