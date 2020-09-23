const server = require("express").Router();
const { Productos } = require("../models/Productos.js");

server.post("/new", async (req, res) => {
  let productos = await Productos.create(req.body);
  res.status(200).json(productos);
});

module.exports = server;
