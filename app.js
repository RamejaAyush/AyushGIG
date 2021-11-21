// importing all the dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const { Sequelize } = require("sequelize");

const db = new Sequelize("AyushGIG", "postgres", "123456", {
 host: "localhost:5432",
 dialect: "postgres",
 operatorsAliases: false,

 pool: {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
 },
});

// test db
db
 .authenticate()
 .then(() => console.log("db connected"))
 .catch((err) => console.log(err));

// initializing express
const app = express();

app.get("/", (req, res) => res.send("HELLO"));

// getting port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running on ${PORT}`));
