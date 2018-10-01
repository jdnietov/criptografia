/*
* Petmutations functions
*/
//arrayOperations = require('../lib/arrayOperations')
import arrayOperations from '../lib/arrayOperations.js';
//boolOperations = require('../lib/boolOperations')
import boolOperations from '../lib/boolOperations.js';

const computingDES = {};

// Generate subkeys
function generateSubKey (masterKey, permut, keyShift, pc2) {
  var tmpKey;
  var subkeys = [];

  for(var i = 0; i < keyShift.length; i++) {
    tmpKey = arrayOperations.permutation(masterKey, permut, false);
    tmpKey = arrayOperations.splitMessage(tmpKey);
    tmpKey[0] = arrayOperations.shiftKey(tmpKey[0], keyShift[i]);
    tmpKey[1] = arrayOperations.shiftKey(tmpKey[1], keyShift[i]);
    subkeys[i] = tmpKey[0].concat(tmpKey[1]);
    subkeys[i] = arrayOperations.permutation(subkeys[i], pc2, false);
  }

  return subkeys;
}
// genreate sboxes
function computeSBoxs (block, sBoxs) {
  // Split block in eight
  newBlock = [];
  finalBlock = [];
  for(var i = 0; i < 8; i++) {
    newBlock[i] = block.splice(0,6);
  }

  // Compute sboxes
  for(var i = 0; i < 8; i++) {
    line = newBlock[i][0] + '' + newBlock[i][5];
    column = newBlock[i][1] + '' + newBlock[i][2] + '' + newBlock[i][3] + '' + newBlock[i][4];
    line = parseInt(line, 2);
    column = parseInt(column, 2);
    index = line * 16 + column;
    value = sBoxs[i][index];
    value = boolOperations.dec2bin(value);
    newBlock[i] = value.split('');
    for(var j = newBlock[i].length; j < 4; j++) {
      newBlock[i].unshift('0');
    }
  }

  for(var i = 0; i < 8; i++) {
    finalBlock = finalBlock.concat(newBlock[i])
  }

  return finalBlock
}

computingDES.computeSBoxs = computeSBoxs;
computingDES.generateSubKey = generateSubKey;

export default computingDES;
