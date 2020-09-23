const server = require("express").Router();
const passport = require("passport");
const axios = require("axios");
const { SMTPClient } = require("emailjs");
const { Users } = require("../models/index.js");
const bcrypt = require("bcrypt");

/**
 * @swagger
 * /login:
 *  post:
 *    description: Use to login app
 *    responses:
 *      '200':
 *        description: A successful response
 */
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

/**
 * @swagger
 * /perfil:
 *  post:
 *    description: Use to list bills for users id
 *    responses:
 *      '200':
 *        description: A successful response
 */

server.get("/perfil", isLoggedIn, (req, res) => {
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

function isLoggedIn(req, res, next) {
  // console.log("###### Parámetro req del isLoggedIn ######");
  // console.log(req);
  if (req.isAuthenticated()) {
    console.log("###### Propiedad session del isLoggedIn ######");
    console.log(req.session);
    var user = {
      id: req.session.passport.user,
      isLoggedIn: req.isAuthenticated(),
    };
    console.log("###### Variable user del isLoggedIn ######");
    console.log(user);
    return next();
  }
  res.redirect("/login");
}

module.exports = server;
