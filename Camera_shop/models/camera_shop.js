'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Camera_shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Employees,{onDelete: "cascade", hooks: true}); //, 
      this.hasMany(models.Suppliers);
      this.hasMany(models.Cameras,{onDelete: "cascade", hooks: true});
      this.hasMany(models.Lenses,{onDelete: "cascade", hooks: true});
      this.hasMany(models.Tripods,{onDelete: "cascade", hooks: true});
      this.hasMany(models.Filters,{onDelete: "cascade", hooks: true});
      this.hasMany(models.Microphones,{onDelete: "cascade", hooks: true});//{foreignKey: "cameraShopId", as: "microphones"}
      this.hasMany(models.Purchase,{onDelete: "cascade", hooks: true});
    }
  }
  Camera_shop.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Camera_shop',
  });
  return Camera_shop;
};