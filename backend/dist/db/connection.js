"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const players_1 = require("../models/players");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("fifaxacademy", "root", "2122", {
    host: "localhost",
    dialect: "mysql",
});
players_1.players.initModel(sequelize);
exports.default = sequelize;
