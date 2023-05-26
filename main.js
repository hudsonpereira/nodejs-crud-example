const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  db.all('SELECT * FROM users', (err, database) => {
    res.render("index", {database});
  });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  const { name, age } = req.body;

  const stmt = db.prepare('INSERT INTO users(name, age) VALUES(?, ?)')
  stmt.run(name, age)
  stmt.finalize();

  res.redirect("/");
});

app.get("/:userId/edit", (req, res) => {
  db.get('SELECT * FROM users WHERE ID = ' + req.params.userId, (err, record) => {
    res.render("edit", { id, name, age } = record);
  })
});

app.post("/:userId/edit", (req, res) => {
  const { name, age } = req.body;

  const stmt = db.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?')
  stmt.run(name, age, req.params.userId)
  stmt.finalize();

  res.redirect("/");
});

app.get("/:userId/delete", (req, res) => {
  db.run('DELETE FROM users WHERE id = ' + req.params.userId)

  res.redirect("/");
});

app.listen(3000);
