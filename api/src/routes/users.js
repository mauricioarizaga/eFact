const server = require("express").Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models/index.js");
const isLoggedIn = require("./auth");

server.get("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Users.findOne({
    where: { id: id },
  }).then((result) => {
    res.send(result);
  });
});
/**
 * @swagger
 * /new :
 *  post:
 *    description: Registrar Usuarios
 *    responses:
 *      '200':
 *        description: A successful response
 */
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
