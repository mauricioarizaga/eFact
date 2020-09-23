const server = require("express").Router();
const { Facturas } = require("../models/index.js");
const isLoggedIn = require("./auth");
const crypto = require("crypto-js");

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
    emailCliente,
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
  var hashedEmail = crypto
    .SHA3(emailCliente, { outputLength: 224 })
    .toString(crypto.enc.Hex);

  const valUrl = `http://localhost:3001/facturar/${hashedEmail}`;

  const client = new SMTPClient({
    user: "UserSMTPServer",
    password: "Password",
    host: "smtp.host.com",
    ssl: false,
    port: 587,
  });

  const message = {
    alternative: true,
    text: `Gracias por su compra de ${total} siga el enlace para realizar el pago ${valUrl}`,
    from: "iFactura <ifactura@ifactura.com>",
    to: `<${emailCliente}>`,
    // cc: 'else <else@your-email.com>',
    subject: "Factura Pendiente de Pago",
  };

  // send the message and get a callback with an error or details of the message that was sent
  client.send(message, function (err, message) {
    //console.log(err || message);
  });
});

server.get("/facturar/:hash", isLoggedIn, async (req, res) => {
  swal
    .fire({
      title: "¡Su factura ha sido pagada!",
      icon: "success",
    })
    .res.status(200);
});

server.get("/:id", isLoggedIn, async (req, res) => {
  const facturasId = await Facturas.findAll({
    where: {
      usuarioId: req.params.id,
    },
  });

  res.status(200).json(facturasId);
});
module.exports = server;
