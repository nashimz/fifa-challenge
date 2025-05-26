"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizemeta = exports.players = void 0;
exports.initModels = initModels;
const players_1 = require("./players");
Object.defineProperty(exports, "players", { enumerable: true, get: function () { return players_1.players; } });
const sequelizemeta_1 = require("./sequelizemeta");
Object.defineProperty(exports, "sequelizemeta", { enumerable: true, get: function () { return sequelizemeta_1.sequelizemeta; } });
function initModels(sequelize) {
    const players = players_1.players.initModel(sequelize);
    const sequelizemeta = sequelizemeta_1.sequelizemeta.initModel(sequelize);
    return {
        players: players,
        sequelizemeta: sequelizemeta,
    };
}
