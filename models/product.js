"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        onDelete: "cascade",
      });
      this.hasMany(models.image, {
        foreignKey: "product_id",
        onDelete: "cascade",
      });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      category_id: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
