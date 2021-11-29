"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
 class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  toJSON() {
   return { ...this.get(), id: undefined };
  }
  static associate({ Post }) {
   // define association here
   this.hasMany(Post, { foreignKey: "userId" });
  }
 }
 User.init(
  {
   uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   role: {
    type: DataTypes.STRING,
    allowNull: false,
   },
  },
  {
   sequelize,
   tableName: "users",
   modelName: "User",
  }
 );
 return User;
};
