/**
 * GraphQL's schema definition
 */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

// Imports exported function from database.js
import {
  Universe,
  getUniverse,
  Character,
  getCharacter,
  getCharacters,
} from './database';

// Next, let's define a node interface and type.
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Character') {
      return getCharacter(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Character) {
      return characterType;
    } else {
      return null;
    }
  }
);

var universeType = new GraphQLObjectType({
  name: 'Universe',
  description: 'A universe of characters',
  fields: () => ({
    id: globalIdField('Universe'),
    characters: {
      type: characterConnection,
      description: 'Characters from the universe',
      args: connectionArgs,
      resolve: (universe, args) => connectionFromArray(getCharacters(), args),
    },
  }),
  interfaces: [nodeInterface],
});

// Let's define our character type
var characterType = new GraphQLObjectType({
  name: 'Character',
  description: 'A character from the DC Comics Universe',
  fields: () => ({
    id: globalIdField('Character'),
    name: {
      type: GraphQLString,
      description: 'The name of the DC Comics character',
      resolve: (character) => character.name,
    }
  }),
  interfaces: [nodeInterface],
});


var {connectionType: characterConnection} =
  connectionDefinitions({name: 'Character', nodeType: characterType});


//  Now let's associate these types with the root query type.
// GraphQL's query 'query { characters }' should return all characters
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    universe: {
      type: universeType,
      resolve: () => getUniverse(),
    },
  }),
});

// Finally, we construct our schema
export var Schema = new GraphQLSchema({
  query: queryType,
//  mutation: mutationType
});
