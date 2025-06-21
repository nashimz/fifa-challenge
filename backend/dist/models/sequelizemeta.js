"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizemeta = void 0;
const sequelize_1 = require("sequelize");
class sequelizemeta extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelizemeta.init({
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                primaryKey: true,
            },
        }, {
            sequelize,
            tableName: "sequelizemeta",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "unique_player_per_version",
                    unique: true,
                    using: "BTREE",
                    fields: ["fifa_version", "long_name", "player_positions"],
                },
            ],
        });
    }
}
exports.sequelizemeta = sequelizemeta;
