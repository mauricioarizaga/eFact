const { Router } = require("express");
const router = Router();
const passport = require("passport");
const session = require("express-session");

const authPath = require("./auth.js");
const usersPath = require("./users.js");
const facturasPath = require("./facturas.js");
const productosPath = require("./productos.js");

router.use("/auth", authPath);
router.use("/users", usersPath);
router.use("/facturas", facturasPath);
router.use("/productos", productosPath);

module.exports = router;
