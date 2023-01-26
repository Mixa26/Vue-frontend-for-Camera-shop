'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Microphones extends Model {
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
  Microphones.init({
    company: DataTypes.STRING,
    model: DataTypes.STRING,
    type: DataTypes.STRING,
    frequency_range: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Microphones',
  });
  return Microphones;
};