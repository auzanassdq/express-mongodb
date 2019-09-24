const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb");
const assert = require("assert");
const objectId = require("mongodb").ObjectID

const app = express();
const PORT = process.env.PORT || 3000;
const url = "mongodb://localhost:27017";
const dbName = "todos_db";
let db;

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get("/", (req, res) => res.send("Hello World"));

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

app.delete("/", (req, res) => {
  db.collection("todos").remove(
    { _id: objectId(req.body.id)},
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

app.put("/", (req, res) => {
  db.collection("todos").updateOne(
    { 
      _id: {$eq: objectId(req.body.id)}
    },
    {
      $set: {name: req.body.name}
    },
    (err, result) => {
    try {
      res.send(result);
    } catch (error) {
      console.log(error);
      console.log(err);
    }
  })
});


// const insertTodo = (db, callback) => {
//   db.collection("todos").insertOne(
//     {name: "nyoba konekin mongo", completed: false},
//     (err, result) => {
//       assert.equal(err, null)
//       callback(result)
//     }
//   )
// }

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
