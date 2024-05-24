const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();

// MIDDLEWARES
// middleware to load up the html
app.use(express.static(path.join(__dirname, "..", "client")));
// middleware to parse json
app.use(express.json());
// middleware to parse body from html forms
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "..", "db", "database.json");

// validation function
function validateForm({ firstname, lastname, othernames, phone, email, gender }) {
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

  if (!/^[a-zA-Z]+$/.test(othernames)) {
    errors.othernames = "Othernames cannot contain numbers";
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

app.post("/submit", async (req, res) => {
  const { firstname, lastname, othernames, email, phone, gender } = req.body;

  const errors = validateForm({
    firstname,
    lastname,
    othernames,
    phone,
    email,
    gender,
  });

  if (Object.keys(errors).length) {
    res.status(400).json({ errors });
    return;
  }

  try {
    let data;
    try {
      data = await fs.readFile(filePath, "utf8");
      console.log("File Read Successfully");
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("File does not exist, initializing new database");
        data = "[]"; // Initialize with an empty array if file does not exist
      } else {
        throw err;
      }
    }

    const database = JSON.parse(data);
    database.push(req.body);

    await fs.writeFile(filePath, JSON.stringify(database, null, 2));
    console.log("File written Successfully");
    res.status(200).json({ message: "Data saved successfully" });

  } catch (err) {
    console.log("An error occurred", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
