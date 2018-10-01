/*
* Petmutations functions
*/
const arrayOperations = {};

  // Function to premute message
function permutation (message, perm, keepData = true) {
  var permutedMessage;

  if(keepData) permutedMessage = message;
  else permutedMessage = [];

  for(var i = 0; i < perm.length; i++) {
    permutedMessage[i] = message[perm[i] - 1];
  }

  return permutedMessage;
}
// Function to splice message
function splitMessage (message) {
  splitedMessage = []

  splitedMessage[0] = message.slice(0, message.length/2)
  splitedMessage[1] = message.slice(message.length/2)

  return splitedMessage
}
// Function to shift keys
function shiftKey (key, shiftValue) {
  var end;

  for(var i = 0; i < shiftValue; i++) {
    end = key.shift()
    key = key.concat(end)
  }

  return key
}
// Display arrays
function displayArray (data) {
  var value = '['
  for(var i = 0; i < data.length; i++) {
    value += data[i]
    if (i !== data.length - 1) value += ', '
  }
  value += ']'
  console.log(value)
}

arrayOperations.permutation = permutation;
arrayOperations.splitMessage = splitMessage;
arrayOperations.shiftKey = shiftKey;

export default arrayOperations;
