require("dotenv").config();
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { databaseService } = require("./services/databaseService");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const dbService = databaseService();
require("./routes/routes")(app, dbService);

app.listen(3100, function () {
  console.log("App listening on port 3100!");
});
