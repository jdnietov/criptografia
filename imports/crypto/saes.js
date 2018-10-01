const Saes = {};

const BLOCK_SIZE = 8;
const SUBBYTES = {
    "00": "00", "01": "01", "02": "8d", "03": "f6", "04": "cb", 
    "05": "52", "06": "7b", "07": "d1", "08": "e8", "09": "4f", "0a": "29",
    "0b": "c0", "0c": "b0", "0d": "e1", "0e": "e5", "0f": "c7",

    "10": "74", "11": "b4", "12": "aa", "13": "4b", "14": "99", 
    "15": "2b", "16": "60", "17": "5f", "18": "58", "19": "3f", "1a": "fd",
    "1b": "cc", "1c": "ff", "1d": "40", "1e": "ee", "1f": "b2",

    "20": "3a", "21": "6e", "22": "5a", "23": "f1", "24": "55", 
    "25": "4d", "26": "a8", "27": "c9", "28": "c1", "29": "0a", "2a": "98",
    "2b": "15", "2c": "30", "2d": "44", "2e": "a2", "2f": "c2",

    "30": "2c", "31": "45", "32": "92", "33": "6c", "34": "f3", 
    "35": "39", "36": "66", "37": "42", "38": "f2", "39": "35", "3a": "20",
    "3b": "6f", "3c": "77", "3d": "bb", "3e": "59", "3f": "19",

    "40": "1d", "41": "fe", "42": "37", "43": "67", "44": "2d", 
    "45": "31", "46": "f5", "47": "69", "48": "a7", "49": "64", "4a": "ab",
    "4b": "13", "4c": "54", "4d": "25", "4e": "e9", "4f": "09",

    "50": "ed", "51": "5c", "52": "05", "53": "ca", "54": "4c", 
    "55": "24", "56": "87", "57": "bf", "58": "18", "59": "3e", "5a": "22",
    "5b": "f0", "5c": "51", "5d": "ec", "5e": "61", "5f": "17",

    "60": "16", "61": "5e", "62": "af", "63": "d3", "64": "49", 
    "65": "a6", "66": "36", "67": "43", "68": "f4", "69": "47", "6a": "91",
    "6b": "df", "6c": "33", "6d": "93", "6e": "21", "6f": "3b",

    "70": "79", "71": "b7", "72": "97", "73": "85", "74": "10", 
    "75": "b5", "76": "ba", "77": "3c", "78": "b6", "79": "70", "7a": "d0",
    "7b": "06", "7c": "a1", "7d": "fa", "7e": "81", "7f": "82",

    "80": "83", "81": "7e", "82": "7f", "83": "80", "84": "96", 
    "85": "73", "86": "be", "87": "56", "88": "9b", "89": "9e", "8a": "95",
    "8b": "d9", "8c": "f7", "8d": "02", "8e": "b9", "8f": "a4",

    "90": "de", "91": "6a", "92": "32", "93": "6d", "94": "d8", 
    "95": "8a", "96": "84", "97": "72", "98": "2a", "99": "14", "9a": "9f",
    "9b": "88", "9c": "f9", "9d": "dc", "9e": "89", "9f": "9a",

    "a0": "fb", "a1": "7c", "a2": "2e", "a3": "c3", "a4": "8f", 
    "a5": "b8", "a6": "65", "a7": "48", "a8": "26", "a9": "c8", "aa": "12",
    "ab": "4a", "ac": "ce", "ad": "e7", "ae": "d2", "af": "62",

    "b0": "0c", "b1": "e0", "b2": "1f", "b3": "ef", "b4": "11", 
    "b5": "75", "b6": "78", "b7": "71", "b8": "a5", "b9": "8e", "ba": "76",
    "bb": "3d", "bc": "bd", "bd": "bc", "be": "86", "bf": "57",

    "c0": "0b", "c1": "28", "c2": "2f", "c3": "a3", "c4": "da", 
    "c5": "d4", "c6": "e4", "c7": "0f", "c8": "a9", "c9": "27", "ca": "53",
    "cb": "04", "cc": "1b", "cd": "fc", "ce": "ac", "cf": "e6",

    "d0": "7a", "d1": "07", "d2": "ae", "d3": "63", "d4": "c5", 
    "d5": "db", "d6": "e2", "d7": "ea", "d8": "94", "d9": "8b", "da": "c4",
    "db": "d5", "dc": "9d", "dd": "f8", "de": "90", "df": "6b",

    "e0": "b1", "e1": "0d", "e2": "d6", "e3": "eb", "e4": "c6", 
    "e5": "0e", "e6": "cf", "e7": "ad", "e8": "08", "e9": "4e", "ea": "d7",
    "eb": "e3", "ec": "5d", "ed": "50", "ee": "1e", "ef": "b3",

    "f0": "5b", "f1": "23", "f2": "38", "f3": "34", "f4": "68", 
    "f5": "46", "f6": "03", "f7": "8c", "f8": "dd", "f9": "9c", "fa": "7d",
    "fb": "a0", "fc": "cd", "fd": "1a", "fe": "41", "ff": "1c",
};

function strToHex(str) {
    var result = "";
    for(let i = 0; i < str.length; i++) {
        let hex = str.charCodeAt(i).toString(16);
        if(hex.length == 1) hex = "0" + hex;
        result += hex;        
    }
    return result;
}

function fromHex(str) {
    var result = "";
    for(let i = 0; i < str.length; i+=2)
        result += String.fromCharCode(parseInt("0x" + str.substr(i,2)));
    return result;
}

function multiply2x2(block, key) {
    let matrix = [[parseInt("0x" + block.substr(0,2)), parseInt("0x" + block.substr(2,2))],
                [parseInt("0x" + block.substr(4,2)), parseInt("0x" + block.substr(6,2))]];
    
    let mult = [
        (matrix[0][0]*key[0][0] + matrix[0][1]*key[1][0]) % 256,
        (matrix[0][0]*key[0][1] + matrix[0][1]*key[1][1]) % 256,
        (matrix[1][0]*key[0][0] + matrix[1][1]*key[1][0]) % 256,
        (matrix[1][0]*key[0][1] + matrix[1][1]*key[1][1]) % 256
    ];

    let result = "";
    mult.forEach((element) => {
        res = element.toString(16);
        if(res.length == 1) res = "0" + res;
        result += res;
    })

    return result;
}

/**
 * @param {String} block The 4-hexadecimal digit block to be encrypted by SAES
 */
function applySubBytes(block) {
    var result = "";
    for(let i = 0; i < BLOCK_SIZE; i+=2) {
        result += SUBBYTES[block.substr(i, 2)];
    }
    return result;
}

function revertSubBytes(block) {
    var result = "";
    for(let i = 0; i < BLOCK_SIZE; i+=2)
        result += Object.keys(SUBBYTES).find(key => SUBBYTES[key] === block.substr(i, 2));
    return result;
}

function encryptBlock(block, key) {
    if(block.length !== BLOCK_SIZE) {
        console.error("block must have length 8");
        return;
    }
    
    let stageOne = block;
    for(let i = 0; i < 3; i++)
        stageOne = applySubBytes(stageOne);
    let stageTwo = [stageOne.substr(6, 2), stageOne.substr(4, 2), stageOne.substr(2, 2), stageOne.substr(0, 2)].join("");
    let stageThree = multiply2x2(stageTwo, key);

    return stageThree;
}

/**
 * @param {String} message The message to encrypt
 */
function encrypt(message, keyarr) {
    key = [[keyarr.value1, keyarr.value2], [keyarr.value3, keyarr.value4]];
    console.log(key);
    var result = "";

    message = strToHex(message);

    for(let i = 0; i < message.length; i+=BLOCK_SIZE) {
        let sub = message.substr(i, BLOCK_SIZE)
        if(i+BLOCK_SIZE>=message.length) {
            while(sub.length < BLOCK_SIZE)   sub += "0";
        }
        result += encryptBlock(sub, key);
    }

    // result = fromHex(result);
    return result;
}

function decryptBlock(block, key) {
    let stageOne = multiply2x2(block, key);
    let stageTwo = [stageOne.substr(6, 2), stageOne.substr(4, 2), stageOne.substr(2, 2), stageOne.substr(0, 2)].join("");
    let result = stageTwo;
    for(let i = 0; i < 3; i++)
        result = revertSubBytes(result);
    return result;
}

function decrypt(cyphertext, keyarr) {
    const { value1, value2, value3, value4 } = keyarr;
    inverse = [[value4 % 256, (256-value2) % 256], [(256-value3) % 256, value1 % 256]];
    console.log(inverse);
    result = "";

    for(let i = 0; i < cyphertext.length; i+= BLOCK_SIZE) {
        let sub = cyphertext.substr(i, BLOCK_SIZE);
        result += decryptBlock(sub, inverse);
   }

   return fromHex(result);
}

Saes.encrypt = encrypt;
Saes.decrypt = decrypt;

export default Saes;