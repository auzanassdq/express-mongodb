const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require('./config/db')
const todoRouter = require('./routes/todo')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/todos", todoRouter)

db.connect(() => {
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
})