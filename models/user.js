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
   this.hasMany(Post, { foreignKey: "userId", as: "posts" });
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
    validate: {
     notNull: { msg: "User must have a Name" },
     notEmpty: { msg: "Enter a valid Name" },
     notNull: { msg: "User must have a Name" },
     notEmpty: { msg: "Enter a valid Name" },
    },
   },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     isEmail: { msg: "enter a valid Email" },
     notNull: { msg: "User must have a Email" },
     notEmpty: { msg: "Enter a valid Email" },
    },
    validate: {
     isEmail: { msg: "Enter a valid Email" },
     notNull: { msg: "User must have a Email" },
     notEmpty: { msg: "Enter a valid Email" },
    },
   },
   role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     notNull: { msg: "User must have a Email" },
     notEmpty: { msg: "Enter a valid Email" },
    },
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
