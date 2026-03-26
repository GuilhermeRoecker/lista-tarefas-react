import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "meu_banco",
  password: "root",
  port: 5432,
});


app.get("/tasks", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM todo_list.tasks ORDER BY id DESC"
  );
  res.json(result.rows);
});

app.post("/tasks", async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  const result = await pool.query(
    `INSERT INTO todo_list.tasks 
     (title, description, due_date, status) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, dueDate, status]
  );

  res.json(result.rows[0]);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  const result = await pool.query(
    `UPDATE todo_list.tasks
     SET title = $1,
         description = $2,
         due_date = $3,
         status = $4
     WHERE id = $5
     RETURNING *`,
    [title, description, dueDate, status, id]
  );

  res.json(result.rows[0]);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM todo_list.tasks WHERE id = $1", [id]);

  res.sendStatus(204);
});

app.patch("/tasks/:id/toggle", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `UPDATE todo_list.tasks
     SET completed = NOT completed
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  res.json(result.rows[0]);
});

app.listen(3001, () => {
  console.log("API rodando na porta 3001");
});