const express = require("express");
const router = express.Router();
const {
  userLogin,
  userRegister,
  userEdit,
  userList,
} = require("../controllers/user.controllers");

const { upload } = require("../middlewares/uploads");
const { auth } = require("../middlewares/jwt_auth");

router
  .post("/register", userRegister)
  .post("/login", userLogin)
  .get("/list", auth, userList)
  .patch("/profile/:id", upload, auth, userEdit);

module.exports = router;
