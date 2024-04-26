require("dotenv").config();

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { databaseService } = require("./services/databaseService");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const dbService = databaseService();
require("./routes/routes")(app, dbService);

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
});

let lastCheckTimestamp = Date.now() - 3600000;

async function checkForNewInsertions() {
  try {
    const insertions = await dbService.getRecentInsertions(lastCheckTimestamp);

    if (insertions.length > 0) {
      notifyClients(insertions);
    }

    lastCheckTimestamp = Date.now();
  } catch (error) {
    console.error(error);
  }
}

function notifyClients(insertions) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "NEW_INSERTIONS",
          data: insertions,
        })
      );
    }
  });
}

const pollInterval = 5000;
setInterval(checkForNewInsertions, pollInterval);

server.listen(3100, function () {
  console.log("3100 OK");
});
