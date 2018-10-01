import { Meteor } from 'meteor/meteor';
import { Client } from 'pg';

var HASH = 854;

Meteor.startup(() => {
  const client = new Client({
    user: 'jdnietov',
    host: '127.0.0.1',
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
});
