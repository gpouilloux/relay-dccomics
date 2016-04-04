/**
 * Mock database - everything's stored in-memory
 */

// Model types
export class Universe {}
export class Character {}

// Mock data
var universe = new Universe();

var characters = [];
(function() {
  var character = new Character();
  character.id = 1;
  character.name = 'The Flash';
  characters.push(character);
  character = new Character();
  character.id = 2;
  character.name = 'Green Arrow';
  characters.push(character);
})();

// Exported functions
export function getUniverse() {
  return universe;
}

export function getCharacter(id) {
  return characters.find(c => c.id === id)
}

export function getCharacters() { return characters; }
