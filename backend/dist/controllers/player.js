"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.updatePlayer = exports.postPlayer = exports.deletePlayer = exports.getPlayer = exports.exportPlayersCSV = exports.getPlayers = void 0;
const players_1 = require("../models/players");
const sequelize_1 = require("sequelize");
const json2csv_1 = require("json2csv"); //
const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse filter parameters
        const name = req.query.name || "";
        const club = req.query.club || "";
        const position = req.query.position || "";
        const where = {};
        if (name)
            where.long_name = { [sequelize_1.Op.like]: `%${name}%` }; // Filter by name (partial match)
        if (club)
            where.club_name = { [sequelize_1.Op.like]: `%${club}%` }; // Filter by club (partial match)
        if (position)
            where.player_positions = { [sequelize_1.Op.like]: `%${position}%` }; // Filter by position (partial match)
        console.log("Filters applied:", where); // Debug: check the filters
        // Else, apply pagination for regular API response
        const limit = 25; // Default limit to 15
        const pageParam = Array.isArray(req.query.page)
            ? req.query.page[0]
            : req.query.page;
        const page = parseInt(pageParam) || 1; // Default to page 1 if not valid
        const offset = (page - 1) * limit;
        const { count, rows: paginatedRows } = yield players_1.players.findAndCountAll({
            where,
            limit, // Limit the number of results per page
            offset, // Offset for pagination
        });
        // Send paginated response with totalItems, totalPages
        res.status(200).json({
            players: paginatedRows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    }
    catch (_a) {
        res
            .status(500)
            .json({ message: "An error occurred while fetching players." });
    }
});
exports.getPlayers = getPlayers;
/* res.json({
    msg: "get Player",
  }); */
const exportPlayersCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse filter parameters
        const name = req.query.name || "";
        const club = req.query.club || "";
        const position = req.query.position || "";
        const where = {};
        if (name)
            where.long_name = { [sequelize_1.Op.like]: `%${name}%` };
        if (club)
            where.club_name = { [sequelize_1.Op.like]: `%${club}%` };
        if (position)
            where.player_positions = { [sequelize_1.Op.like]: `%${position}%` };
        console.log("Filters applied for CSV export:", where); // Debug
        // Fetch all matching players without pagination
        const allPlayers = yield players_1.players.findAll({ where });
        // Convert to JSON
        const playersData = allPlayers.map((player) => player.toJSON());
        // Define fields for CSV
        const fields = [
            "id",
            "long_name",
            "club_name",
            "players_positions" /* add other fields as needed */,
        ];
        const opts = { fields };
        // Convert JSON to CSV
        const csv = (0, json2csv_1.parse)(playersData, opts);
        // Set response headers for file download
        const utf8BOM = "\uFEFF";
        res.header("Content-Type", "text/csv; charset=utf-8");
        res.attachment("players.csv");
        res.send(utf8BOM + csv);
        return;
    }
    catch (error) {
        console.error("Error exporting players to CSV:", error);
        res
            .status(500)
            .json({ message: "An error occurred while exporting players." });
    }
});
exports.exportPlayersCSV = exportPlayersCSV;
const getPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const player = yield players_1.players.findByPk(id);
    if (player) {
        res.json(player);
    }
    else {
        res.status(404).json({
            msg: `no existe un jugador con el id ${id}`,
        });
    }
});
exports.getPlayer = getPlayer;
const deletePlayer = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "delete Player",
        id: id,
    });
};
exports.deletePlayer = deletePlayer;
const postPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { long_name, player_positions, club_name, nationality_name, overall, skill_moves, player_face_url, pace, shooting, defending, passing, dribbling, physic, } = req.body;
    try {
        const newPlayer = yield players_1.players.create({
            long_name,
            player_positions,
            club_name,
            nationality_name,
            overall,
            skill_moves,
            player_face_url,
            pace,
            shooting,
            defending,
            passing,
            dribbling,
            physic,
        });
        res.status(201).json({
            msg: "Player added successfully",
            player: newPlayer,
        });
    }
    catch (error) {
        console.error("Error adding player:", error);
        res.status(500).json({
            msg: "An error occurred while adding the player",
        });
    }
});
exports.postPlayer = postPlayer;
const updatePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract player ID from URL parameters
    const { long_name, player_positions, club_name, overall, nationality_name, skill_moves, } = req.body; // Extract fields from request body
    try {
        // Find the player by ID
        const player = yield players_1.players.findByPk(id);
        if (!player) {
            // If player not found, send a 404 error
            res.status(404).json({
                msg: `Player with ID ${id} not found`,
            });
        }
        // Update the player's data
        yield players_1.players.update({
            long_name,
            player_positions,
            club_name,
            overall,
            nationality_name,
            skill_moves,
        }, {
            where: { id },
        });
        // Respond with the updated player data
        res.json({
            msg: "Player updated successfully",
            player,
        });
    }
    catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({
            msg: "An error occurred while updating the player",
        });
    }
});
exports.updatePlayer = updatePlayer;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, password } = req.body;
});
exports.login = login;
