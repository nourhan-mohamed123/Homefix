import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _cities from  "./cities.js";
import _users from "./users.js"

export default function initModels(sequelize) {
  const cities = _cities.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);


  return {
    cities,
    users
  };
}
