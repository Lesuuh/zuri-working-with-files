const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const { error } = require("console");
const app = express();

// MIDDLEWARES
// middleware to load up the html
app.use(express.static(path.join(__dirname, "client")));
// middleware to parse json
app.use(express.json());
// middleware to parse body from html forms
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "db", "database.json");

// fs.unlink(filePath, (err) => {
//   if (err) throw err;
//   console.log("file deleted");
// });

// validation function
function validateForm({ firstname, lastname, phone, email, gender }) {
  const errors = {};

  if (firstname === "") {
    errors.firstname = "Firstname cannot be less than 1 letter";
  } else if (!/^[a-zA-Z]+$/.test(firstname)) {
    errors.firstname = "Firstname cannot contain numbers";
  }

  if (lastname === "") {
    errors.lastname = "Lastname cannot be less than 1 letter";
  } else if (!/^[a-zA-Z]+$/.test(lastname)) {
    errors.lastname = "Lastname cannot contain numbers";
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }
  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(phone)) {
    errors.phone = "Phone number must contain only digits";
  }

  if (gender === "") {
    errors.gender = "Please select your gender";
  }

  return errors;
}

app.post("/submit", (req, res) => {
  const { firstname, lastname, othernames, email, phone, gender } = req.body;

  const errors = validateForm({ firstname, lastname, phone, email, gender });

  if (Object.keys(errors).length) {
    console.log(errors);
    res.status(400).json({ errors });
    return;
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("File could not be read");
      res.status(500).json({ message: "Internal Server Error" });
      return;
    } else {
      console.log("File Read Successfully");
    }

    let database = [];
    if (data) {
      database = JSON.parse(data);
    }

    database.push(req.body);

    fs.writeFile(filePath, JSON.stringify(database, null, 2), (err) => {
      if (err) {
        console.log("File Could not be written");
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        console.log("File written Successfully");
        res.status(200).json({ message: "Data saved successfully" });
      }
    });
  });
});

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
