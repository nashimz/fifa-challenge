import type { Sequelize } from "sequelize";
import { players as _players } from "./players";
import type { playersAttributes, playersCreationAttributes } from "./players";
import { sequelizemeta as _sequelizemeta } from "./sequelizemeta";
import type { sequelizemetaAttributes, sequelizemetaCreationAttributes } from "./sequelizemeta";

export {
  _players as players,
  _sequelizemeta as sequelizemeta,
};

export type {
  playersAttributes,
  playersCreationAttributes,
  sequelizemetaAttributes,
  sequelizemetaCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const players = _players.initModel(sequelize);
  const sequelizemeta = _sequelizemeta.initModel(sequelize);


  return {
    players: players,
    sequelizemeta: sequelizemeta,
  };
}
