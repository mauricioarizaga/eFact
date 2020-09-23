const server = require("express").Router();
const passport = require("passport");
const axios = require("axios");
const { SMTPClient } = require("emailjs");
const { Users } = require("../models/index.js");
const bcrypt = require("bcrypt");

server.post("/changepassword");

server.post(
  "/login",
  function (req, res, next) {
    next();
  },
  passport.authenticate("local-signin"),
  (req, res) => {
    res.send(req.user);
  }
);

server.post(
  "/register",
  function (req, res, next) {
    next();
  },
  passport.authenticate("local-signup", {
    // successRedirect: '/login',
    // failureRedirect: '/signup',
    // badRequestMessage: "You must fill in all of the form fields.",
    // failureFlash: true, // allow flash,
    session: false, // prevent auto-login
  }),
  (req, res) => {
    validateEmail(req.user.email, req.user.email_hash);
    res.send(req.user);
  }
);

server.get("/perfil", (req, res) => {
  Users.findOne({
    where: {
      id: req.user.id,
    },
  }).then((result) => {
    if (result === null) {
      res.send("el usuario no ha sido encontrado");
    } else {
      res.send(result);
    }
  });
});

function validateEmail(email, email_hash) {
  const valUrl = `http://localhost:3001/auth/validate/account/${email_hash}`;

  const client = new SMTPClient({
    user: "UserSMTPServer",
    password: "Password",
    host: "smtp.host.com",
    ssl: false,
    port: 587,
  });

  const message = {
    alternative: true,
    text: `Bienvenid@. Se adjunta enlace para validar y continuar con el registro: ${valUrl}`,
    from: "Henry Bank FT02 <henrybank@mauricioarizaga.com.ar>",
    to: `Nuevo Usuario <${email}>`,
    // cc: 'else <else@your-email.com>',
    subject: "Henry Bank - Validación de Usuario",
  };

  // send the message and get a callback with an error or details of the message that was sent
  client.send(message, function (err, message) {
    //console.log(err || message);
  });
}

function resetPassword(email, req, res) {
  Users.update(
    {
      password_hash: 1000000,
    },
    {
      returning: true,
      where: { email: email },
    }
  ).then((user) => {
    // const valUrl = `http://localhost:3001/auth/resetpassword/${hash}`;
    console.log(user[1][0]);
    const ressetLink = "http://localhost:3000/resetpassword/" + user[1][0].id;
    const client = new SMTPClient({
      user: "UserSMTPServer",
      password: "Password",
      host: "smtp.host.com",
      ssl: false,
      port: 587,
    });

    const message = {
      text: `Se adjunta codigo para resetear contraseña: ${user[1][0].password_hash}, ingresa tu clave aqui: ${ressetLink}`,
      from: "Henry Bank FT02 <henrybank@mauricioarizaga.com.ar>",
      to: `Reset password <${email}>`,
      // cc: 'else <else@your-email.com>',
      subject: "Henry Bank - RESET PASSWORD",
    };

    // send the message and get a callback with an error or details of the message that was sent
    client.send(message, function (err, message) {
      //console.log(err || message);
    });

    res.json(user).sendStatus(200);
  });
}

server.post("/validate/resetpassword", (req, res) => {
  resetPassword(req.body.email, req, res);
});

server.put("/resetpassword/:hash", (req, res) => {
  const hash = req.params.hash;
  const { newPassword, email } = req.body;
  const contraseñahash = bcrypt.hashSync(newPassword, 10);

  Users.findOne({ where: { email: email, password_hash: hash } })
    .then((user) => {
      Users.update(
        {
          password: contraseñahash,
          password_hash: null,
        },
        {
          returning: true,
          where: { id: user.id },
        }
      );
      res.status(200).json({ message: "Su contraseña ha sido cambiada!" });
    })
    .catch((err) => {
      res.status(404).json({
        message: "El codigo es incorrecto o ocurrio un error, intente de nuevo",
      });
    });
});

module.exports = server;
