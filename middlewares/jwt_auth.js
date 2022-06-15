const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  auth: (req, res, next) => {
    try {
      let token = req.headers["authorization"];
      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({
            message: "Invalid Token",
            success: false,
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } catch (error) {
      res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }
  },
};
