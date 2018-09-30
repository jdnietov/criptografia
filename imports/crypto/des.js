import BigNumber from 'bignumber.js';

export const generateDesKey = function() {
    return BigNumber.random(16).times(10e16).toString(16);
}

export const encryptByDes = function(message) {
    
}