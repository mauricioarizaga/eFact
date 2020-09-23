const server = require("express").Router();
const { Facturas } = require("../models/index.js");

server.post("/new", (req, res) => {
  const {
    usuarioId,
    cliente,
    cuit,
    productos,
    cantidad,
    subtotal,
    descuento,
    total,
  } = req.body;
  Facturas.create({
    usuarioId,
    cliente,
    cuit,
    productos,
    cantidad,
    subtotal,
    descuento,
    total,
  });
});

server.get("/:id", async (req, res) => {
  const facturasId = await Facturas.findAll({
    where: {
      usuarioId: req.params.id,
    },
  });

  res.status(200).json(facturasId);
});
module.exports = server;
