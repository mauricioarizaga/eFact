const server = require("express").Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models/index.js");

server.get("/", (req, res) => {
  Users.findAll({
    order: [["id", "ASC"]],
  }).then((result) => {
    res.send(result);
  });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findOne({
    where: { id: id },
  }).then((result) => {
    res.send(result);
  });
});

server.post("/new", async (req, res) => {
  const { email, password, fullName, idNumber, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  Users.create({
    email,
    password: hashedPassword,
    fullName,
    idNumber,
    phone,
    email_hash: email,
  }).catch((err) => {
    if (err.original) res.send(err.original.messageDetail);
    else res.send("Error de validación de datos");
  });
});

module.exports = server;
