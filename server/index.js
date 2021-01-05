const express = require("express");
const app = express();
const connection = require("./config");
const moviesRouter = require("./routes/movies.route");
const port = 5000;
//const cors = require('cors');

app.use(express.json());
//app.use('cors');

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
