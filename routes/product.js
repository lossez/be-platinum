const express = require("express");
const router = express.Router();

const { productCreate } = require("../controllers/product.controller");

const { auth } = require("../middlewares/jwt_auth");
const { multiple } = require("../middlewares/uploads");

router.post("/create", multiple, auth, productCreate);

module.exports = router;
