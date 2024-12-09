import { players } from "../models/players";
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fifaxacademy", "root", "2122", {
  host: "localhost",
  dialect: "mysql",
});

players.initModel(sequelize);

export default sequelize;
