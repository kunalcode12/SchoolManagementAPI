const mysql = require("mysql2");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const database = mysql
  .createPool({
    host: process.env.HOST,
    port: process.env.PORT_DATABASE,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: process.env.CONNECTION_LIMIT,
    queueLimit: process.env.QUEUE_LIMIT,
  })
  .promise();
module.exports = database;
