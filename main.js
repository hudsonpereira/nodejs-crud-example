const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var database = [
  { name: "Hudson", age: 30 },
  { name: "Lucas", age: 23 },
  { name: "Henédio", age: 40 },
];

app.get("/", (req, res) => {
  res.render("index", { database });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { name, age } = req.body;

  database.push({ name, age });

  res.redirect("/");
});

app.get("/:userId/edit", (req, res) => {
  const { name, age } = database[req.params.userId];

  res.render("edit", { name, age });
});

app.post("/:userId/edit", (req, res) => {
  const { name, age } = req.body;

  database[req.params.userId] = {
    name,
    age,
  };

  res.redirect("/");
});

app.get("/:userId/delete", (req, res) => {
  database.splice(req.params.userId, 1);

  res.redirect("/");
});

app.listen(3000);
