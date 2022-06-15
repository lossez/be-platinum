const express = require("express");
const router = express.Router();
const {
  userLogin,
  userRegister,
  userList,
  userEdit,
} = require("../controllers/user.controller");

const { upload } = require("../middlewares/uploads");
const { auth } = require("../middlewares/jwt_auth");

router
  .post("/register", userRegister)
  .post("/login", userLogin)
  .get("/list", auth, userList)
  .patch("/profile/:id", upload, auth, userEdit);

module.exports = router;
