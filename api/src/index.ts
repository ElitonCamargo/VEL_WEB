import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
});

app.get("/", (req, res) => {
  res.send("🚗 API de Veículos com TS!");
});

app.get("/db-test", (req, res) => {
  pool.query("SELECT * FROM perfis", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor no container rodando na porta ${PORT}`);
});