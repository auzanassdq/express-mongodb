const objectId = require("mongodb").ObjectID
const db = require("../config/db")

module.exports = {
  getTodos: (req, res) => {
    db.get().collection("todos").find({}).toArray((err, item) => {
      res.status(200).send(item)
    })
  },

  postTodo: (req, res) => {
    db.get().collection("todos").insertOne(
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
    },

  deleteTodo: (req, res) => {
    db.get().collection("todos").remove(
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
    },

  updateTodo:  (req, res) => {
    db.get().collection("todos").updateOne(
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
    }
    
}
