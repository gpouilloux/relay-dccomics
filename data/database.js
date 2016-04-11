/**
 * Mock database - everything's stored in-memory
 */

// Model types
import Universe from './types/universe';
import Character from './types/character';

// Mock data
var universe = new Universe();
universe.id = 1;

var characters = [];
(function() {
  characters.push(new Character(1, 'The Flash'));
  characters.push(new Character(2, 'Green Arrow'));
})();

// Exported functions
export function getUniverse() {
  return universe;
}

export function getCharacter(id) {
  return characters.find(c => c.id === id);
}

export function getCharacters() {
  return characters;
}

export function deleteCharacter(name) {
  characters = characters.filter(c => c.name != name);
}
