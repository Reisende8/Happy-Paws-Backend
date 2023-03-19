import { Sequelize } from "sequelize-typescript";
const config = require("../config/config.js");
console.log("config is: \n", config);

const sequelize = new Sequelize(config);

export default sequelize;
