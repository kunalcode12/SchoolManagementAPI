const dataBase = require("./db");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!  Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./app");

dataBase
  .getConnection()
  .then((connection) => {
    console.log("Connected to the MySQL database as ID", connection.threadId);
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.stack);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!  Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// module.exports = database;
