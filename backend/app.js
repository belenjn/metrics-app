require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { databaseService } = require("./services/databaseService");

app.use(bodyParser.json());

const dbService = databaseService();
require("./routes/routes")(app, dbService);

app.listen(3100, function () {
  console.log("App listening on port 3100!");
});
