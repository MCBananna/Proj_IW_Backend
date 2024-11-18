const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "root", // Replace with your MySQL password
  database: "testdatabase", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// CRUD APIs

// Create
app.post("/api/create", (req, res) => {
  const { name, age } = req.body;
  const sql = "INSERT INTO testtable (name, age) VALUES (?, ?)";
  db.query(sql, [name, age], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("test created!");
  });
});

// Read
app.get("/api/testtable", (req, res) => {
  const sql = "SELECT * FROM testtable";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Update
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const sql = "UPDATE testtable SET name = ?, age = ? WHERE id = ?";
  db.query(sql, [name, age, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("test updated!");
  });
});

// Delete
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM testtable WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("test deleted!");
  });
});

// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});