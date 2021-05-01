### Installation

Clone this repo and open two terminal windows in the root directory. In the first terminal, run an npm install:

`$ npm install`

In the second terminal, you can start your docker server with the following commands:

`$ cd docker`

`$ docker-compose -f stack.yml up`

Your docker server should now be up and running. In the first terminal (still in the root directory), you can initialize the GraphQL server with seed data:

`$ npm run seed`

Now you should be ready to start the Apollo server. To do so, run:

`$ npm run dev`

### Resolvers

In the playground created on port 4000, you can interact with the GraphQL API in the following ways. 

    {
     firstPokemon {
        id
        name
        classification
      }
    }

Returns the first Pokemon in the database.

    {
     findPokemon(pkId: "id") {
        id
        name
        classification
      }
    }

Returns a specific pokemon when passed an ID. Replace 'id' with the autoId of the pokemon you'd like to reference.

    {
     createPokemon {
        id
        name
        classification
      }
    }

Creates a new Pokemon and adds it to the database.

    {
     upsertPokemon {
        id
        name
        classification
      }
    }

Updates an existing Pokemon, or adds a new one if one does not exist.

    {
     resetPokemon {
        id
        name
        classification
      }
    }

Resets the database. The original dataset can be obtained again by running the NPM seed command.
