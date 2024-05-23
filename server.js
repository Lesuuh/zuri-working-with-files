const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// MIDDLEWARES
// middleware to load up the html
app.use(express.static(path.join(__dirname, "client")));
// middleware to parse json
app.use(express.json());
// middleware to parse body from html forms
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "client", "database.json");

app.post("/submit", (req, res) => {
  res.json(req.body);
  //   console.log(req.body);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("File could not be read");
    } else {
      console.log("File Read Succesfully");
    }

    let database = [];
    if (data) {
      database = JSON.parse(data);
    }

    database.push(req.body);

    fs.writeFile(filePath, JSON.stringify(database, null, 2), (err) => {
      if (err) {
        console.log("File Could not be written");
      } else {
        console.log("File written Successfuly");
      }
    });
  });
});

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server is running");
});
