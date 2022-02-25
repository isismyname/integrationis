'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.cartproduct,{
        as: "cartproduct",
        foreignKey:{
          name: "idCartProduct"
        }
      })
      transaction.belongsTo(models.user, {
        as: "buyerUser",
        foreignKey: {
          name: "idBuyer"
        }
      })
    }
  }
  transaction.init({
    idBuyer: DataTypes.INTEGER,
    idCartProduct: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};