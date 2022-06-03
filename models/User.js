const sequelize = require('../config/dbconn.js');
const { Model, DataTypes } = require('sequelize');

class User extends Model { }
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

module.exports = User;
