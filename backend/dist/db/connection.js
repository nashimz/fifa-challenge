"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const players_1 = require("../models/players");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("fifaxacademy", "root", "2122", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000, // 30s
        idle: 10000,
    },
    dialectOptions: {
        connectTimeout: 60000, // 60s
    },
});
players_1.players.initModel(sequelize);
exports.default = sequelize;
