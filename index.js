const { ApolloServer, gql } = require('apollo-server');
const pkdata = require('./pkmn/pkmn.json')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Pokemon {
    id: String
    name: String
    classification: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
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
      pokemon: () => pokemon,
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});