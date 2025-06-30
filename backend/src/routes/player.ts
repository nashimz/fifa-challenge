import { Router } from "express";

import {
  validateGetPlayers,
  validateGetPlayerById,
  validatePostPlayer,
  validateUpdatePlayer,
  validateGetPlayerSkillTimeline,
  validateExportPlayersCSV,
  validateUploadCSV,
} from "../middlewares/player-validators";
import {
  exportPlayersCSV,
  getPlayer,
  getPlayers,
  getPlayerSkillTimeline,
  postPlayer,
  updatePlayer,
  uploadCSV,
} from "../controllers/player";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";

const router = Router();

router.get("/", validateGetPlayers, handleValidationErrors, getPlayers);

router.get(
  "/csv",
  validateExportPlayersCSV,
  handleValidationErrors,
  exportPlayersCSV
);
router.get("/:id", validateGetPlayerById, handleValidationErrors, getPlayer);

router.post("/", validatePostPlayer, handleValidationErrors, postPlayer);
router.put("/:id", validateUpdatePlayer, handleValidationErrors, updatePlayer);
router.get(
  "/:id/timeline",
  validateGetPlayerSkillTimeline,
  handleValidationErrors,
  getPlayerSkillTimeline
);

router.post(
  "/upload-csv",
  validateUploadCSV,
  handleValidationErrors,
  uploadCSV
);

export default router;
