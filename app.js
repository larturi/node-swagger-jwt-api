require("dotenv").config();
const express = require("express");
const morganBody = require("morgan-body");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dbConnectNoSql = require("./config/mongo");
const { dbConnectMySQL } = require("./config/mysql");
const { loggerSlack } = require("./utils/handleLoger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const engine = process.env.DB_ENGINE || null;
const port = process.env.PORT || 3000;

morganBody(app, {
  skip: function (req, res) {
    return (
      [403, 404, 409].includes(res.statusCode) || res.statusCode < 400
    );
  },
  stream: loggerSlack,
});

/**
 * API - Documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * API Rest
 */
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Tu server esta listo por el puerto ${port}`)
  console.log(`\nhttp://localhost:3000/api-docs\n`)
});

/**
 * Define your database engine
 */

if (engine === "mysql") {
  dbConnectMySQL();
  return;
}
if (engine === "nosql") {
  dbConnectNoSql();
  return;
}
