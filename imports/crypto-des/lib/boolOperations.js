/*
* Petmutations functions
*/
const boolOperations = {};

// XOR two bits arrays
function arrayXOR (first, second) {
  for(var i = 0; i < first.length; i++) {
    first[i] = first[i] ^ second[i];
  }
  return first;
}
// Convert decimal to binary
function dec2bin (dec) {
  return (dec >>> 0).toString(2);
}

boolOperations.arrayXOR = arrayXOR;
boolOperations.dec2bin = dec2bin;

export default boolOperations;
