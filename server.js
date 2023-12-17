const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { MongoClient } = require("mongodb");
const process = require("node:process");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const tulipes = new Map();
const INITIAL = 86400;
const ADD = 21600;
const MAX = 16;
let count = 0;
let socketsNumber = 0;

async function getTulipsData() {
  try {
    const client = new MongoClient(process.env.DB_STRING);
    const db = client.db("garden");
    const collection = db.collection("tulips");
    client.connect();

    await collection.find().forEach((data) => {
      tulipes.set(data._id, {
        xaxe: data.x,
        yaxe: data.y,
        name: data.name,
        date: data.date,
        life: data.life,
        water: data.water,
      });
    });
    client.close();
  } catch (error) {
    console.log(error);
  }
}

async function modifTulipsData() {
  try {
    const client = new MongoClient(process.env.DB_STRING);
    const db = client.db("garden");
    const collection = db.collection("tulips");
    client.connect();

    await collection.deleteMany({});

    const doc = [];
    tulipes.forEach((tulipe, user) => {
      doc.push({
        _id: user,
        name: tulipe.name,
        date: tulipe.date,
        life: tulipe.life,
        y: tulipe.yaxe,
        x: tulipe.xaxe,
        water: tulipe.water,
      });
    });

    if (doc.length != 0) {
      await collection.insertMany(doc);
    }

    client.close();
  } catch (error) {
    console.log(error);
  }
}

io.on("connection", (socket) => {
  socketsNumber += 1;

  if (socketsNumber == 1) {
    console.log(
      "---\nFirst session user connected, tulips have been loaded from database."
    );
    getTulipsData();
  } else {
    console.log("---\nA user has connected.");
    console.log("User(s) connected : " + socketsNumber);
  }

  setInterval(update, 1000);
  function update() {
    let now = Date.now();

    tulipes.forEach((tulipe, user) => {
      if (Math.round((now - tulipe.date) / 1000) >= tulipe.life) {
        tulipes.delete(user);
        count -= 1;
      }
    });
    io.emit("drawTuls", [JSON.stringify(Array.from(tulipes)), now]);
  }

  socket.on("addTulPush", (data) => {
    if (!tulipes.has(data.user)) {
      if (count < MAX) {
        tulipes.set(data.user, {
          name: data.name,
          xaxe: data.x,
          yaxe: data.y,
          life: INITIAL,
          date: Date.now(),
          water: 0,
        });
        count += 1;
      } else {
        socket.emit("error", MAX);
      }
    } else {
      socket.emit("error", 0);
    }
  });
  socket.on("addTimer", (data) => {
    if (tulipes.has(data)) {
      tulipes.get(data).life += ADD;
      tulipes.get(data).water = Date.now();
    }
  });
  socket.on("disconnect", function () {
    socketsNumber -= 1;
    if (socketsNumber == 0) {
      console.log(
        "---\nNo more users connected, tulips have been saved to database."
      );
      modifTulipsData();
    } else {
      console.log("---\nA user has disconnected.");
      console.log("User(s) connected : " + socketsNumber);
    }
  });
});

server.listen(3000, function () {
  console.log("localhost:3000");
});
