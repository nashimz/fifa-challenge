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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerSkillTimeline = exports.updatePlayer = exports.postPlayer = exports.getPlayer = exports.exportPlayersCSV = exports.getPlayers = exports.uploadCSV = void 0;
const players_1 = require("../models/players");
const sequelize_1 = require("sequelize");
const json2csv_1 = require("json2csv"); //
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.uploadCSV = [
    upload.single("file"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("File received:", req.file);
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const results = [];
        const filePath = req.file.path;
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on("data", (data) => results.push(data))
            .on("error", (err) => {
            console.error("Error reading CSV:", err);
            fs_1.default.unlinkSync(filePath);
            res.status(500).json({ message: "Error reading CSV file" });
        })
            .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const chunkSize = 500;
                for (let i = 0; i < results.length; i += chunkSize) {
                    const chunk = results.slice(i, i + chunkSize);
                    try {
                        yield players_1.players.bulkCreate(chunk, {
                            ignoreDuplicates: true,
                            validate: true,
                        });
                    }
                    catch (chunkErr) {
                        console.error(`Error inserting chunk starting at row ${i}:`, chunkErr);
                        throw chunkErr;
                    }
                }
                fs_1.default.unlinkSync(filePath);
                res.json({
                    message: "CSV data imported successfully",
                    count: results.length,
                });
            }
            catch (error) {
                console.error("Error importing CSV:", error);
                res.status(500).json({ message: "Error importing CSV data" });
            }
        }));
    }),
];
const getPlayers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name || "";
        const club = req.query.club || "";
        const position = req.query.position || "";
        const where = {};
        if (name) {
            const nameTerms = name.trim().split(/\s+/);
            where[sequelize_1.Op.and] = nameTerms.map((term) => ({
                long_name: { [sequelize_1.Op.like]: `%${term}%` },
            }));
        }
        if (club)
            where.club_name = { [sequelize_1.Op.like]: `%${club}%` };
        if (position)
            where.player_positions = { [sequelize_1.Op.like]: `%${position}%` };
        console.log("Filters applied:", where); // Debug: check the filters
        // Else, apply pagination for regular API response
        const limit = 25; // Default limit to 25
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
const exportPlayersCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name || "";
        const club = req.query.club || "";
        const position = req.query.position || "";
        const where = {};
        if (name) {
            const nameTerms = name.trim().split(/\s+/);
            where[sequelize_1.Op.and] = nameTerms.map((term) => ({
                long_name: { [sequelize_1.Op.like]: `%${term}%` },
            }));
        }
        if (club)
            where.club_name = { [sequelize_1.Op.like]: `%${club}%` };
        if (position)
            where.player_positions = { [sequelize_1.Op.like]: `%${position}%` };
        const allPlayers = yield players_1.players.findAll({ where });
        const playersData = allPlayers.map((player) => player.toJSON());
        const fields = ["id", "long_name", "club_name", "players_positions"];
        const opts = { fields };
        const csv = (0, json2csv_1.parse)(playersData, opts);
        const utf8BOM = "\uFEFF";
        res.header("Content-Type", "text/csv; charset=utf-8");
        res.attachment("players.csv");
        res.send(utf8BOM + csv);
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
const postPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { long_name, player_positions, club_name, nationality_name, player_face_url, pace, shooting, defending, passing, dribbling, physic, } = req.body;
    try {
        const skillValues = [pace, shooting, defending, passing, dribbling, physic];
        const overall = Math.round(skillValues.reduce((sum, val) => sum + Number(val), 0) /
            skillValues.length);
        const newPlayer = yield players_1.players.create({
            long_name,
            player_positions,
            club_name,
            nationality_name,
            player_face_url,
            pace,
            shooting,
            defending,
            passing,
            dribbling,
            physic,
            overall,
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
    const { id } = req.params;
    const { long_name, player_positions, club_name, nationality_name, player_face_url, pace, shooting, defending, passing, dribbling, physic, } = req.body;
    try {
        // Find the player by ID
        const player = yield players_1.players.findByPk(id);
        if (!player) {
            res.status(404).json({
                msg: `Player with ID ${id} not found`,
            });
        }
        const skillValues = [pace, shooting, defending, passing, dribbling, physic];
        const overall = Math.round(skillValues.reduce((sum, val) => sum + Number(val), 0) /
            skillValues.length);
        yield players_1.players.update({
            long_name,
            player_positions,
            club_name,
            nationality_name,
            player_face_url,
            pace,
            shooting,
            defending,
            passing,
            dribbling,
            physic,
            overall,
        }, {
            where: { id },
        });
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
const getPlayerSkillTimeline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const skillParam = req.query.skill;
    const allowedSkills = [
        "pace",
        "shooting",
        "passing",
        "dribbling",
        "defending",
        "physic",
        "overall",
    ];
    if (!skillParam) {
        res.status(400).json({ message: "Skill query parameter is required." });
        return;
    }
    // Split skills by comma, trim whitespace, filter out empties
    const requestedSkills = skillParam
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length > 0);
    // Validate requested skills
    const invalidSkills = requestedSkills.filter((s) => !allowedSkills.includes(s));
    if (invalidSkills.length > 0) {
        res.status(400).json({
            message: `Invalid skill(s) selected: ${invalidSkills.join(", ")}`,
        });
        return;
    }
    try {
        const playerRecord = yield players_1.players.findByPk(id);
        if (!playerRecord) {
            res.status(404).json({ message: "Player not found" });
            return;
        }
        // Query all records with the player's long_name
        const playerTimelineRecords = yield players_1.players.findAll({
            where: {
                long_name: playerRecord.long_name,
            },
            // Select fifa_version, fifa_update and all requested skills
            attributes: ["fifa_version", "fifa_update", ...requestedSkills],
            order: [
                ["fifa_version", "ASC"],
                ["fifa_update", "ASC"],
            ],
        });
        // Build response object:
        // { pace: [...], shooting: [...], passing: [...] }
        const result = {};
        requestedSkills.forEach((skill) => {
            result[skill] = playerTimelineRecords.map((record) => ({
                fifa_version: record.fifa_version,
                fifa_update: record.fifa_update,
                value: record.get(skill),
            }));
        });
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching skill timeline:", error);
        res.status(500).json({
            message: "An error occurred while fetching skill timeline.",
        });
    }
});
exports.getPlayerSkillTimeline = getPlayerSkillTimeline;
