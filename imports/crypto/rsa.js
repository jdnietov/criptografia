const getPrime = require('./primeGenerator');
import BigNumber from 'bignumber.js';

//let primeEx = getPrime.getBigPrime();

rsa = {};

const primes = [2, 3, 5, 7, 11, 13, 17, 53, 61];

function randomPrime() { return primes[Math.floor(Math.random() * 9)]; }


const eea = (a, b) => {
    if(b > a) {
        let aux = a;
        a = b;
        b = aux;
    }

    const q = Math.floor(a/b);

    if(b == 0) {
        return { d: a, x: 1, y: 0 };
    } else {
        let temp = eea(b, a % b);
        return { d: temp.d, x: temp.y, y: temp.x - q * temp.y}
    }
}

function powerMod(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}

rsa.cryptosystem = function() {
    let p = getPrime.getBigPrime();
    let q = getPrime.getBigPrime();
    
    
    
    //let p = randomPrime();
    //let q = randomPrime();

    while(q == p)   q = getPrime.getBigPrime();
    console.log("P: " + p);
    console.log("Q: " + q);
    
    
    const n = p * q;
    console.log("=====================================>>>>>>>>>>>>>: " + n );
    const totient = (p-1) * (q-1);
    
    let es = [], ds = [];
    let i = 2;
    let count = 0;

    while(i < totient && count < 100) {
        const res = eea(i, totient);
        if(res.d == 1) {
            es.push(i);
            ds.push(res);
            count++;
        }
        i++;
    }

    const idx = Math.floor(Math.random() * es.length);
    let e = es[idx], d = ds[idx].y;
    if(d < 0)    d = totient + d;
    
    return { e, d, n };
}

rsa.encrypt = function(message, e, n) {
    let c = [];
    let i;
    for(i = 0; i < message.length; i++) {
        const m = message.charCodeAt(i);
        console.log(m);
        c.push(BigNumber(m).pow(e).mod(n).toString());
    }
    return c;
}

rsa.decrypt = function(encryption, d, n) {
    // console.log("[*] enterying rsa.decrypt function.");
    let i;
    let m = '';
    console.log(encryption);
    for(i = 0; i < encryption.length; i++) {
        const c = encryption[i];
        // console.log(BigNumber(c).pow(d).mod(n).toString());
        m += String.fromCharCode(parseInt(BigNumber(c).pow(d).mod(n).toString()));
    }
    // console.log("[*] exiting rsa.decrypt function.");
    return m;
}

export const RSA = rsa;