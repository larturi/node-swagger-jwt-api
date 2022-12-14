const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "mysql",
});

const dbConnectMySQL = async () => {
  try {
    console.log(database, username, password);

    await sequelize.authenticate();
    console.log("MySQL connected");
  } catch (e) {
    console.log("MySQL ERROR connected", e);
  }
};

module.exports = { sequelize, dbConnectMySQL };
