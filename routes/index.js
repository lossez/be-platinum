const express = require("express");
const router = express.Router();

const users = require("./users");
const product = require("./product");

router.use("/api/users/", users);
router.use("/api/product/", product);

module.exports = router;
