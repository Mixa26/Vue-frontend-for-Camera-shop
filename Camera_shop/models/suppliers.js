'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Camera_shop, {foreign_key: "cameraShopId", as: "camera_shop"});
    }
  }
  Suppliers.init({
    name: DataTypes.STRING,
    country_origin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suppliers',
  });
  return Suppliers;
};