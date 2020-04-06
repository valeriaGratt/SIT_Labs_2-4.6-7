const express = require("express");

const { Pool } = require("pg");
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'students',
  password: 'password',
  port: 32768,
});
const app = express();

app.get("/students", async (req, res) => {
  const result = await pool.query("SELECT * FROM students;");
  res.send(result.rows);
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM students WHERE id = $1 ;", [
    id
  ]);
  console.log(result.rows);
  if (result.rowCount === 0) {
    res.send(`Error: student ${id} was not found`);
  } else {
    res.send(result.rows);
  }
});

app.post("/students", async (req, res) => {
  let date = new Date();
  var student = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    group: req.query.group,
    createdAt: date.toLocaleString(),
    updatedAt: date.toLocaleString()
  };
  const insert =
    "INSERT INTO students (first_name, last_name, group_name, created_at, updated_at) VALUES ($1 , $2 , $3 , $4 , $5);";
  pool.query(insert, [
    student.firstName,
    student.lastName,
    student.group,
    student.createdAt,
    student.updatedAt
  ]);
  res.send("Ok");
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM students WHERE id = $1 ;", [
    id
  ]);
  if (result.rowCount === 0) {
    res.send(`Error: student ${id} was not found`);
  } else {
    const result = await pool.query("DELETE FROM students WHERE id = $1 ;", [
      id
    ]);
    res.send(`Student ${id} was deleted`);
  }
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM students WHERE id = $1 ;", [
    id
  ]);
  if (result.rowCount === 0) {
    res.send(`Студент с id: ${id} не существует`);
  } else {
    let date = new Date();
    var student = {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      updatedAt: date.toLocaleString()
    };
    const insert =
      "UPDATE students SET first_name = $1 , last_name = $2 , updated_at = $3 WHERE id = $4 ;";
    pool.query(insert, [
      student.firstName,
      student.lastName,
      student.updatedAt,
      id
    ]);
    res.send("Ok");
  }
});

app.listen(3000, function() {
  console.log('API app started');
})  
