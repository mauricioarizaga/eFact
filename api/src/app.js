const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const server = express();
const passport = require("passport");
const session = require("express-session");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("./models");
server.name = "API";

// For Passport
server.use(
  session({
    name: "iFacturaConectado",
    secret: "efacturatefactura2e34df545fde45fdsdft5r!=",
    resave: false,
    saveUninitialized: false,
  })
); // session secret
server.use(passport.initialize());
server.use(passport.session()); // persistent login sessions

//load passport strategies
require("./passport.js")(passport);

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "iFactura Swagger",
      version: "0.1.0",
      description: "Sistema Facturacion ",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Mauricio",
        email: "mauricioarizaga@hotmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
module.exports = server;
