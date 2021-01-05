const express = require('express');
const router = express.Router();
const connection = require("../config");

router.get('/', (req, res) => {
        connection.query("SELECT * from movies", (err, results) => {
          if (err) {
            res.status(500).send("Error retrieving data");
          } else {
            res.status(200).json(results);
          }
        });
});

router.get("/movies/:id", (req, res) => {
    connection.query(
      "SELECT * from movies WHERE id=?",
      [req.params.id],
      (err, results) => {
        if (err) {
          res.status(500).send("Error retrieving data");
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

router.post("/", (req, res) => {
    const { title, director, year, color, duration } = req.body;
    connection.query(
      "INSERT INTO movies (title, director, year, color, duration) VALUES (?, ?, ?, ?, ?);",
      [title, director, year, color, duration],
      (err, results) => {
          //console.log(err);
        if (err) {
          res.status(500).send("Error retrieving data");
        } else {
            connection.query(`SELECT * FROM movies WHERE id=${results.insertId};`, (err2, newMovie) => {
              if(err2){
                  res.status(500).send("Error retrieving data");
              } else {
                  res.status(200).json(newMovie);
              }
            })
        }
      }
    );
  });

module.exports = router;