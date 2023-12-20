const express = require('express');
const mysql = require('mysql');
const router = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", async (req, res) => {
  res.json({ status: "Wild Nest! Ready to roll!"});
});

app.get("/:plant", async (req, res) => {
  const query = "SELECT * FROM plants WHERE nama = ?";
  pool.query(query, [ req.params.plant ], (error, results) => {
    if (!results[0]) {
      res.json({ status: "Not found!" });
    } else {
      res.json(results[0]);
    }
  });
});

app.post("/", async (req, res) => {
  const data = {
    nama: req.body.nama,
    namaIlmiah: req.body.namaIliah,
    lokasi: req.body.lokasi, 
    tingkatRacun: req.body.tingkatRacun,
    efek: req.body.efek
  }
  const query ="INSERT INTO plants VALUES (?, ?, ?, ?, ?)";
  pool.query(query, Object.values(data), (error) => {
    if (error){
      res.json({ status: "failure", reason: error.code });
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});