import { Router } from "express";
import {
  exportPlayersCSV,
  getPlayer,
  getPlayers,
  getPlayerSkillTimeline,
  postPlayer,
  updatePlayer,
} from "../controllers/player";

const router = Router();

router.get("/", getPlayers);
router.get("/csv", exportPlayersCSV);
router.get("/:id", getPlayer);

router.post("/", postPlayer);
router.put("/:id", updatePlayer);
router.get("/:id/timeline", getPlayerSkillTimeline);

export default router;
