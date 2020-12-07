// import module
const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// use module
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
let db;
const url = "mongodb://localhost:27017";
const dbName = "todos_db";

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    if (err) throw err
    
    db = client.db(dbName);
    console.log("Connected successfully to server");
  }
);

// simple route
app.get("/", (req, res) => {
    db.collection("todos").find({}).toArray((err, item) => {
      res.status(200).send(item)
    })
});

app.post("/", (req, res) => {
  db.collection("todos").insertOne(
    { name: req.body.name, completed: false },
    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(error);
        console.log(err);
      }
    }
  );
});

// server listen
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
