const models = require("../models");

module.exports = {
  productCreate: async (req, res) => {
    try {
      let data = req.body;
      let images = [];

      if (req.files) {
        req.files.map((file) => {
          images.push(file.filename);
        });
        data.image = JSON.stringify(images);
      }

      let user = await models.user.findOne({
        where: {
          id: data.user_id,
        },
      });

      if (!user) {
        res.status(403).json({
          message: "User not found",
          success: false,
        });
      } else {
        let product = await models.product.create(data);
        res.status(200).json({
          message: "Success Create Product",
          data: product,
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
};
