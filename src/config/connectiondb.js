const { Client } = require('pg');

const secrets = JSON.parse(process.env.DB);

function startConnection() {
  const connectionData = {
    user: secrets.username,
    host: secrets.host,
    database: secrets.dbname,
    password: secrets.password,
    port: secrets.port,
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
  const myClient = new Client(connectionData);
  myClient.connect();
  return myClient;
}

module.exports = startConnection;
