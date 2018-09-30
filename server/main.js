import { Meteor } from 'meteor/meteor';
import { Client } from 'pg';

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

  Meteor.methods({
    'fetchKey'(keyId) {
      return client.query("SELECT value1, value2, value3, value4 FROM keys WHERE id=" + keyId + ";");
    }
  });
});
