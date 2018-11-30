const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];

const randomPrime = () => primes[Math.random() * 9];

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

const rsa = () => {
    const p = randomPrime();
    const q = randomPrime;
    const n = p * q;
    const totient = (p-1) * (q-1);

    let e = 2;
    while(eea(e, totient).d != 1) {
        e++;
    }

    const k = 2;
    let d = (1 + (k * totient)) / e;

    
}