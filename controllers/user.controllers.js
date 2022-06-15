const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

module.exports = {
  userRegister: async (req, res) => {
    try {
      let { name, password, email } = req.body;
      password = await bcrypt.hash(password, 10);

      let user = await models.user.create({
        name,
        password,
        email,
      });
      res.status(200).json({
        message: "Success Register",
        data: user,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
  userLogin: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await models.user.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        res.status(403).json({
          message: "Email not found",
          success: false,
        });
      }
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(403).json({
          message: "Password not match",
          success: false,
        });
      }
      let token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        process.env.SECRET
      );

      let data = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        no_hp: user.no_hp,
        city: user.city,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      res.status(200).json({
        message: "Success Login",
        token: "Bearer " + token,
        data,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
  userEdit: async (req, res) => {
    try {
      let { id } = req.params;
      console.log(id, "id");
      let data = req.body;
      let img = req.file;

      let user = await models.user.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User not found",
          success: false,
        });
      } else {
        if (img) {
          data.image = img.filename;
          if (
            fs.existsSync(`public/images/${user.image}`) &&
            user.image !== null
          ) {
            fs.unlinkSync(`public/images/${user.image}`);
          }
        }

        let update = await models.user.update(data, {
          where: {
            id,
          },
        });
        res.status(200).json({
          message: "Success Edit",
          success: true,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
  userList: async (req, res) => {
    try {
      let user = await models.user.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        message: "Success List",
        data: user,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  },
};
