import { query, body, param } from "express-validator";

const allowedSkills = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physic",
  "overall",
];

export const validateGetPlayers = [
  query("name")
    .optional()
    .isString()
    .withMessage("Name must be a string.")
    .isLength({ max: 100 })
    .withMessage("Name is too long.")
    .trim()
    .escape(),

  query("club")
    .optional()
    .isString()
    .withMessage("Club must be a string.")
    .isLength({ max: 100 })
    .withMessage("Club is too long.")
    .trim()
    .escape(),

  query("position")
    .optional()
    .isString()
    .withMessage("Position must be a string.")
    .isLength({ max: 50 })
    .withMessage("Position is too long.")
    .trim()
    .escape(),

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer.")
    .toInt(),
];

export const validateGetPlayerById = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  (req: { params: { id: any } }, res: any, next: () => void) => {
    console.log("ID param received:", req.params.id);
    next();
  },
];

export const validatePostPlayer = [
  body("long_name")
    .exists({ checkFalsy: true })
    .withMessage("long_name is required.")
    .isString()
    .withMessage("long_name must be a string.")
    .isLength({ max: 100 })
    .withMessage("long_name too long.")
    .trim()
    .escape(),

  body("player_positions")
    .exists({ checkFalsy: true })
    .withMessage("player_positions is required.")
    .isString()
    .withMessage("player_positions must be a string.")
    .isLength({ max: 100 })
    .withMessage("player_positions too long.")
    .trim()
    .escape(),

  body("club_name")
    .exists({ checkFalsy: true })
    .withMessage("club_name is required.")
    .isString()
    .withMessage("club_name must be a string.")
    .isLength({ max: 100 })
    .withMessage("club_name too long.")
    .trim()
    .escape(),

  body("nationality_name")
    .exists({ checkFalsy: true })
    .withMessage("nationality_name is required.")
    .isString()
    .withMessage("nationality_name must be a string.")
    .isLength({ max: 100 })
    .withMessage("nationality_name too long.")
    .trim()
    .escape(),

  body("player_face_url")
    .exists({ checkFalsy: true })
    .withMessage("player_face_url is required.")
    .isURL()
    .withMessage("player_face_url must be a valid URL.")
    .isLength({ max: 255 })
    .withMessage("player_face_url too long.")
    .trim(),

  body("pace")
    .exists()
    .withMessage("pace is required.")
    .isInt({ min: 0, max: 100 })
    .withMessage("pace must be between 0 and 99.")
    .toInt(),

  body("shooting")
    .exists()
    .withMessage("shooting is required.")
    .isInt({ min: 0, max: 100 })
    .withMessage("shooting must be between 0 and 99.")
    .toInt(),

  body("defending")
    .exists()
    .withMessage("defending is required.")
    .isInt({ min: 0, max: 100 })
    .withMessage("defending must be between 0 and 99.")
    .toInt(),

  body("passing")
    .exists()
    .withMessage("passing is required.")
    .isInt({ min: 0, max: 100 })
    .withMessage("passing must be between 0 and 99.")
    .toInt(),

  body("dribbling")
    .exists()
    .withMessage("dribbling is required.")
    .isInt({ min: 0, max: 100 })
    .withMessage("dribbling must be between 0 and 99.")
    .toInt(),

  body("physic")
    .exists()
    .withMessage("physic is required.")
    .isInt({ min: 0, max: 100 })
    .withMessage("physic must be between 0 and 99.")
    .toInt(),
];

export const validateUpdatePlayer = [
  param("id")
    .exists()
    .withMessage("Player ID is required.")
    .isInt({ min: 1 })
    .withMessage("Player ID must be a positive integer.")
    .toInt(),

  body("long_name")
    .exists({ checkFalsy: true })
    .withMessage("long_name is required.")
    .isString()
    .withMessage("long_name must be a string.")
    .isLength({ max: 100 })
    .withMessage("long_name too long.")
    .trim()
    .escape(),

  body("player_positions")
    .exists({ checkFalsy: true })
    .withMessage("player_positions is required.")
    .isString()
    .withMessage("player_positions must be a string.")
    .isLength({ max: 100 })
    .withMessage("player_positions too long.")
    .trim()
    .escape(),

  body("club_name")
    .exists({ checkFalsy: true })
    .withMessage("club_name is required.")
    .isString()
    .withMessage("club_name must be a string.")
    .isLength({ max: 100 })
    .withMessage("club_name too long.")
    .trim()
    .escape(),

  body("nationality_name")
    .exists({ checkFalsy: true })
    .withMessage("nationality_name is required.")
    .isString()
    .withMessage("nationality_name must be a string.")
    .isLength({ max: 100 })
    .withMessage("nationality_name too long.")
    .trim()
    .escape(),

  body("player_face_url")
    .exists({ checkFalsy: true })
    .withMessage("player_face_url is required.")
    .isURL()
    .withMessage("player_face_url must be a valid URL.")
    .isLength({ max: 255 })
    .withMessage("player_face_url too long.")
    .trim(),

  body("pace")
    .exists()
    .withMessage("pace is required.")
    .isInt({ min: 0, max: 99 })
    .withMessage("pace must be between 0 and 99.")
    .toInt(),

  body("shooting")
    .exists()
    .withMessage("shooting is required.")
    .isInt({ min: 0, max: 99 })
    .withMessage("shooting must be between 0 and 99.")
    .toInt(),

  body("defending")
    .exists()
    .withMessage("defending is required.")
    .isInt({ min: 0, max: 99 })
    .withMessage("defending must be between 0 and 99.")
    .toInt(),

  body("passing")
    .exists()
    .withMessage("passing is required.")
    .isInt({ min: 0, max: 99 })
    .withMessage("passing must be between 0 and 99.")
    .toInt(),

  body("dribbling")
    .exists()
    .withMessage("dribbling is required.")
    .isInt({ min: 0, max: 99 })
    .withMessage("dribbling must be between 0 and 99.")
    .toInt(),

  body("physic")
    .exists()
    .withMessage("physic is required.")
    .isInt({ min: 0, max: 99 })
    .withMessage("physic must be between 0 and 99.")
    .toInt(),
];

export const validateGetPlayerSkillTimeline = [
  param("id")
    .exists()
    .withMessage("Player ID is required.")
    .isInt({ min: 1 })
    .withMessage("Player ID must be a positive integer.")
    .toInt(),

  query("skill")
    .exists({ checkFalsy: true })
    .withMessage("Skill query parameter is required.")
    .custom((value) => {
      const skills = value
        .split(",")
        .map((s: string) => s.trim().toLowerCase())
        .filter((s: string) => s.length > 0);
      if (skills.length === 0) {
        throw new Error("At least one skill must be specified.");
      }
      const invalid = skills.filter((s: string) => !allowedSkills.includes(s));

      if (invalid.length > 0) {
        throw new Error(`Invalid skill(s): ${invalid.join(", ")}`);
      }
      return true;
    }),
];

export const validateExportPlayersCSV = [
  query("name")
    .optional()
    .isString()
    .withMessage("Name filter must be a string.")
    .isLength({ max: 100 })
    .withMessage("Name filter too long."),
  query("club")
    .optional()
    .isString()
    .withMessage("Club filter must be a string.")
    .isLength({ max: 100 })
    .withMessage("Club filter too long."),
  query("position")
    .optional()
    .isString()
    .withMessage("Position filter must be a string.")
    .isLength({ max: 100 })
    .withMessage("Position filter too long."),
];

export const validateUploadCSV = [
  body("file")
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
