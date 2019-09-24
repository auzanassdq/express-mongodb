const MongoClient = require("mongodb").MongoClient
const assert = require("assert")
const url = "mongodb://localhost:27017";
const dbName = "todos_db";

let db;
function connect(callback) {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
  
      db = client
      callback()
    }
  );
}

function get(){
  return db.db(dbName)
}

function close(){
  db.close()
}

module.exports = {
  connect,
  get,
  close
}
