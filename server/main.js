import { Meteor } from 'meteor/meteor';
import { Client } from 'pg';
import SAES from '../imports/crypto/saes';
import { RSA } from '../imports/crypto/rsa';

var HASH = 854;

Meteor.startup(() => {
  console.log("[*] Meteor server started.");
  const client = new Client({
    user: 'jdnietov',
    host: '192.168.99.101',
    database: 'criptapp',
    password: 'password',
    port: 5432,
  });

  client.connect().catch((error) => {
    console.log(error);
  });

  client.query("SELECT COUNT(*) FROM keys;").then((res, err) => {
    if(err) console.error(err);
    HASH = res.rows[0].count;
  });

  Meteor.methods({
    'fetchKey'(keyword) {
      let h = 0;
      for(let i = 0; i < keyword.length; i++) {
        h += keyword.charCodeAt(i);
      }
      const id = (h % HASH) + 1;
      return client.query("SELECT value1, value2, value3, value4 FROM keys WHERE id=" + id + ";");
    },
  });

  async function fetchKey(keyword) {
    let h = 0;
    for(let i = 0; i < keyword.length; i++) {
      h += keyword.charCodeAt(i);
    }
    const id = (h % HASH) + 1;
    return client.query("SELECT value1, value2, value3, value4 FROM keys WHERE id=" + id + ";").then((err, res) => res.rows[0]);
  }

  let cryptosystem = RSA.cryptosystem();
  
  Meteor.methods({
    'fetchVerifyKey'() {
      const { e, n } = cryptosystem;
      // return { e, n };
      return cryptosystem;
    },

    'encryptSaesFromServer'(message, keyword, verifyKey, messageHash, keywordHash) {
      // decrypt RSA
      const { e, n } = verifyKey;

      if(message === RSA.decrypt(messageHash, e, n) && keyword === RSA.decrypt(keywordHash, e, n)) {
        console.log("ok!");
        let h = 0;
        for(let i = 0; i < keyword.length; i++) {
          h += keyword.charCodeAt(i);
        }
        const id = (h % HASH) + 1;
        return client.query("SELECT value1, value2, value3, value4 FROM keys WHERE id=" + id + ";")
        .then((res, err) => res.rows[0])
        .then(key => SAES.encrypt(message, key));
      } else {
        console.log("[!] ERROR: Message hash does not match.");
        console.log("[!]", RSA.decrypt(messageHash, e, n));
        console.log("[!]", message);
        return { message: "Message mismatch" };
      }
    }
  })
});
