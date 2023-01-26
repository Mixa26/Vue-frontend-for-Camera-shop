'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Camera_shop, {foreign_key: "cameraShopId", as: "camera_shop"});
      this.belongsTo(models.shopping_cart, {foreign_key: "shoppingCartId", as: "shopping_cart"});
    }
  }
  Filters.init({
    company: DataTypes.STRING,
    diameter: DataTypes.INTEGER,
    purpose: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Filters',
  });
  return Filters;
};