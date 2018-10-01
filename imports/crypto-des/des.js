// Require tables
//let permutationsTable = require('./tables/permutations');
import permutationsTable from './tables/permutations.js';
//let expansionTable = require('./tables/expansion');
import expansionTable from './tables/expansion.js';
//let masterKey = require('./tables/masterKey');
// Require functions
//let arrayOperations = require('./lib/arrayOperations');
import arrayOperations from './lib/arrayOperations.js';
//let boolOperations = require('./lib/boolOperations');
import boolOperations from './lib/boolOperations.js';
//let computingDES = require('./lib/computingDES');
import computingDES from './lib/computingDES.js';


// Start of the main script
const des = {};

function desAlg (message, masterKey, mode) {
  // Initial permutation
  message = arrayOperations.permutation(message, permutationsTable.initPerm, false);

  // Split in two blocks
  message = arrayOperations.splitMessage(message);

  // Generate keys
  if (mode){
    subKeys = computingDES.generateSubKey(masterKey, permutationsTable.pc1left.concat(permutationsTable.pc1right), permutationsTable.keyShift, permutationsTable.pc2);
  }else {
    _subKeys = computingDES.generateSubKey(masterKey, permutationsTable.pc1left.concat(permutationsTable.pc1right), permutationsTable.keyShift, permutationsTable.pc2);
    subKeys = _subKeys.reverse();
  }

  // Rounds (x16)       

  for(var i = 0; i < 16; i++) {
    tmp = message[1];
    // Expantion
    message[1] = arrayOperations.permutation(message[1], expansionTable, false);
    // X-or K_i
    message[1] = boolOperations.arrayXOR(message[1], subKeys[i]);
    // Compute sBoxes
    message[1] = computingDES.computeSBoxs(message[1], permutationsTable.sBoxes);
    // function permutation
    message[1] = arrayOperations.permutation(message[1], permutationsTable.permut32, false);
    // X-or first block
    message[1] = boolOperations.arrayXOR(message[1], message[0]);
    // New first block
    message[0] = tmp;
  }

  // Final permutation
  message = message[1].concat(message[0]);
  message = arrayOperations.permutation(message, permutationsTable.reversePerm, false);
  //console.log("Message after permutation :");
  return message;
}

des.desAlg = desAlg;

export default des;
