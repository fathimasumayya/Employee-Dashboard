const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/usermodel");
const bycrpt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/EmpDB")
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.error("error", err);
  });

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bycrpt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.get("/employees", async (req, res) => {
  try {
    const employees = await User.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/employees", async (req, res) => {
  const employee = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/employees/:id", async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.name = req.body.name || employee.name;
    employee.email = req.body.email || employee.email;
    employee.phone = req.body.phone || employee.phone;

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.remove();
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
