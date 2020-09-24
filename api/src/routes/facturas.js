const server = require("express").Router();
const { Facturas, Users } = require("../models/index.js");
const isLoggedIn = require("./auth");
const crypto = require("crypto-js");
const { SMTPClient } = require("emailjs");
/**
 * @swagger
 * /new :
 *  post:
 *    description: Registrar usuarios
 *    responses:
 *      '200':
 *        description: A successful response
 */
server.post("/new", async (req, res) => {
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
  const nuevaFactura = await Facturas.create({
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

  const valUrl = `http://localhost:3001/facturas/pago/:nuevaFactura.id/${hashedEmail}`;

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
    subject: "Factura Pendiente de Pago  ",
  };

  // send the message and get a callback with an error or details of the message that was sent
  client.send(message, function (err, message) {
    //console.log(err || message);
  });
});
/**
 * @swagger
 * /facturar/:hash :
 *  post:
 *    description: Validar y pagar factura
 *    responses:
 *      '200':
 *        description: A successful response
 */
server.get("/pago/:nuevaFactura.id/:email_hash", async (req, res) => {
  const factura = await Factura.findOne({
    where: { id: req.params.nuevaFactura.id },
  });
  const user = await Users.findOne({
    where: { id: factura.usuario.Id },
  });

  const balance = user.saldo + factura.total;
  Users.update({
    saldo: balance,
    where: { id: factura.usuario.id },
  });

  switch (factura.estado) {
    case "Sin Cancelar":
      Facturas.update({
        estado: "Pagada",
        where: { id: factura.id },
      });

      res.redirect(`http://localhost:3000/`);
      res.send({
        status: `La factura ha sido cancelada`,
      });
      break;
    default:
      res.send({ status: `Acción no válida. Contacte a su Administrador` });
      break;
  }
});
/**
 * @swagger
 * /:id :
 *  post:
 *    description: Validar y pagar factura
 *    responses:
 *      '200':
 *        description: A successful response
 */
server.get("/:id", isLoggedIn, async (req, res) => {
  const facturasId = await Facturas.findAll({
    where: {
      usuarioId: req.params.id,
    },
  });

  res.status(200).json(facturasId);
});
module.exports = server;
