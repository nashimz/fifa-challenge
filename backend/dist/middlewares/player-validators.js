"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUploadCSV = exports.validateExportPlayersCSV = exports.validateGetPlayerSkillTimeline = exports.validateUpdatePlayer = exports.validatePostPlayer = exports.validateGetPlayerById = exports.validateGetPlayers = void 0;
const express_validator_1 = require("express-validator");
const allowedSkills = [
    "pace",
    "shooting",
    "passing",
    "dribbling",
    "defending",
    "physic",
    "overall",
];
exports.validateGetPlayers = [
    (0, express_validator_1.query)("name")
        .optional()
        .isString()
        .withMessage("Name must be a string.")
        .isLength({ max: 100 })
        .withMessage("Name is too long.")
        .trim()
        .escape(),
    (0, express_validator_1.query)("club")
        .optional()
        .isString()
        .withMessage("Club must be a string.")
        .isLength({ max: 100 })
        .withMessage("Club is too long.")
        .trim()
        .escape(),
    (0, express_validator_1.query)("position")
        .optional()
        .isString()
        .withMessage("Position must be a string.")
        .isLength({ max: 50 })
        .withMessage("Position is too long.")
        .trim()
        .escape(),
    (0, express_validator_1.query)("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer.")
        .toInt(),
];
exports.validateGetPlayerById = [
    (0, express_validator_1.param)("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
    (req, res, next) => {
        console.log("ID param received:", req.params.id);
        next();
    },
];
exports.validatePostPlayer = [
    (0, express_validator_1.body)("long_name")
        .exists({ checkFalsy: true })
        .withMessage("long_name is required.")
        .isString()
        .withMessage("long_name must be a string.")
        .isLength({ max: 100 })
        .withMessage("long_name too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("player_positions")
        .exists({ checkFalsy: true })
        .withMessage("player_positions is required.")
        .isString()
        .withMessage("player_positions must be a string.")
        .isLength({ max: 100 })
        .withMessage("player_positions too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("club_name")
        .exists({ checkFalsy: true })
        .withMessage("club_name is required.")
        .isString()
        .withMessage("club_name must be a string.")
        .isLength({ max: 100 })
        .withMessage("club_name too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("nationality_name")
        .exists({ checkFalsy: true })
        .withMessage("nationality_name is required.")
        .isString()
        .withMessage("nationality_name must be a string.")
        .isLength({ max: 100 })
        .withMessage("nationality_name too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("player_face_url")
        .exists({ checkFalsy: true })
        .withMessage("player_face_url is required.")
        .isURL()
        .withMessage("player_face_url must be a valid URL.")
        .isLength({ max: 255 })
        .withMessage("player_face_url too long.")
        .trim(),
    (0, express_validator_1.body)("pace")
        .exists()
        .withMessage("pace is required.")
        .isInt({ min: 0, max: 100 })
        .withMessage("pace must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("shooting")
        .exists()
        .withMessage("shooting is required.")
        .isInt({ min: 0, max: 100 })
        .withMessage("shooting must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("defending")
        .exists()
        .withMessage("defending is required.")
        .isInt({ min: 0, max: 100 })
        .withMessage("defending must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("passing")
        .exists()
        .withMessage("passing is required.")
        .isInt({ min: 0, max: 100 })
        .withMessage("passing must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("dribbling")
        .exists()
        .withMessage("dribbling is required.")
        .isInt({ min: 0, max: 100 })
        .withMessage("dribbling must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("physic")
        .exists()
        .withMessage("physic is required.")
        .isInt({ min: 0, max: 100 })
        .withMessage("physic must be between 0 and 99.")
        .toInt(),
];
exports.validateUpdatePlayer = [
    (0, express_validator_1.param)("id")
        .exists()
        .withMessage("Player ID is required.")
        .isInt({ min: 1 })
        .withMessage("Player ID must be a positive integer.")
        .toInt(),
    (0, express_validator_1.body)("long_name")
        .exists({ checkFalsy: true })
        .withMessage("long_name is required.")
        .isString()
        .withMessage("long_name must be a string.")
        .isLength({ max: 100 })
        .withMessage("long_name too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("player_positions")
        .exists({ checkFalsy: true })
        .withMessage("player_positions is required.")
        .isString()
        .withMessage("player_positions must be a string.")
        .isLength({ max: 100 })
        .withMessage("player_positions too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("club_name")
        .exists({ checkFalsy: true })
        .withMessage("club_name is required.")
        .isString()
        .withMessage("club_name must be a string.")
        .isLength({ max: 100 })
        .withMessage("club_name too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("nationality_name")
        .exists({ checkFalsy: true })
        .withMessage("nationality_name is required.")
        .isString()
        .withMessage("nationality_name must be a string.")
        .isLength({ max: 100 })
        .withMessage("nationality_name too long.")
        .trim()
        .escape(),
    (0, express_validator_1.body)("player_face_url")
        .exists({ checkFalsy: true })
        .withMessage("player_face_url is required.")
        .isURL()
        .withMessage("player_face_url must be a valid URL.")
        .isLength({ max: 255 })
        .withMessage("player_face_url too long.")
        .trim(),
    (0, express_validator_1.body)("pace")
        .exists()
        .withMessage("pace is required.")
        .isInt({ min: 0, max: 99 })
        .withMessage("pace must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("shooting")
        .exists()
        .withMessage("shooting is required.")
        .isInt({ min: 0, max: 99 })
        .withMessage("shooting must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("defending")
        .exists()
        .withMessage("defending is required.")
        .isInt({ min: 0, max: 99 })
        .withMessage("defending must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("passing")
        .exists()
        .withMessage("passing is required.")
        .isInt({ min: 0, max: 99 })
        .withMessage("passing must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("dribbling")
        .exists()
        .withMessage("dribbling is required.")
        .isInt({ min: 0, max: 99 })
        .withMessage("dribbling must be between 0 and 99.")
        .toInt(),
    (0, express_validator_1.body)("physic")
        .exists()
        .withMessage("physic is required.")
        .isInt({ min: 0, max: 99 })
        .withMessage("physic must be between 0 and 99.")
        .toInt(),
];
exports.validateGetPlayerSkillTimeline = [
    (0, express_validator_1.param)("id")
        .exists()
        .withMessage("Player ID is required.")
        .isInt({ min: 1 })
        .withMessage("Player ID must be a positive integer.")
        .toInt(),
    (0, express_validator_1.query)("skill")
        .exists({ checkFalsy: true })
        .withMessage("Skill query parameter is required.")
        .custom((value) => {
        const skills = value
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter((s) => s.length > 0);
        if (skills.length === 0) {
            throw new Error("At least one skill must be specified.");
        }
        const invalid = skills.filter((s) => !allowedSkills.includes(s));
        if (invalid.length > 0) {
            throw new Error(`Invalid skill(s): ${invalid.join(", ")}`);
        }
        return true;
    }),
];
exports.validateExportPlayersCSV = [
    (0, express_validator_1.query)("name")
        .optional()
        .isString()
        .withMessage("Name filter must be a string.")
        .isLength({ max: 100 })
        .withMessage("Name filter too long."),
    (0, express_validator_1.query)("club")
        .optional()
        .isString()
        .withMessage("Club filter must be a string.")
        .isLength({ max: 100 })
        .withMessage("Club filter too long."),
    (0, express_validator_1.query)("position")
        .optional()
        .isString()
        .withMessage("Position filter must be a string.")
        .isLength({ max: 100 })
        .withMessage("Position filter too long."),
];
exports.validateUploadCSV = [
    (0, express_validator_1.body)("file")
        .exists()
        .withMessage("CSV file is required.")
        .custom((value, { req }) => {
        if (!req.file) {
            throw new Error("CSV file is required.");
        }
        if (req.file.mimetype !== "text/csv") {
            throw new Error("File must be a CSV.");
        }
        return true;
    }),
];
