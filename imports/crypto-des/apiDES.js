//let desalgorithm = require('./des');
import des from './des.js';

const apiDES = {};

function getParams(message, key, mode) {
  let asciiMess = asciiMessage(message);
  let asciiKey = asciiMessage(key);
  let output = [];
  let val = [];

  while(asciiMess.length>0){
  	//final.push(output.splice(0,64));
    val = des.desAlg(asciiMess.splice(0,64),asciiKey[0], mode);
    output = output.concat(val);
  }
  let mensaje = normMessage(output);
  return mensaje;
}

//¸
function asciiMessage(input) {
    let output = [];
    let final = [];
    let gating = [];
    for(var chr in input){
    	gating.push((input.charCodeAt(chr)).toString(2));
    }
    for (var byte in gating){
    	for(let i = gating[byte].length; i < 8; i++){
        	output.push(0);
        }
        for(var bit in gating[byte]){
        	output.push(parseInt(gating[byte][bit]));
        }
    }

    if(output.length%64 != 0){
    	for (let i = output.length%64; i < 64; i++){
        	output.push(1);
        }
    }

    return output;
}

function normMessage(input) {
  var output = "";
  var str = "";
  var word;
  for (var i = 1; i<=input.length; i++){
    str += input[i-1];
    if(i%8 == 0){
        if (str != "11111111") {
          output += String.fromCharCode(parseInt(str, 2));          
        }
        str= "";
      }
  }
  return output;
}

apiDES.getParams = getParams;
apiDES.asciiMessage = asciiMessage;
apiDES.normMessage = normMessage;

export default apiDES;
