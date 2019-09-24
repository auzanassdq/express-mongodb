const express = require("express")
const route = express.Router()

const 
  { getTodos,
    postTodo,
    deleteTodo,
    updateTodo } = require("../controllers/todo")

route.get("/", getTodos);

route.post("/", postTodo);

route.delete("/", deleteTodo);

route.put("/", updateTodo);

module.exports = route