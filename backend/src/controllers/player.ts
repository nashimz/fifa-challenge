import { Request, Response } from "express";
import { players, playersCreationAttributes } from "../models/players";
import { Op } from "sequelize";
import { parse } from "json2csv"; //
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import path from "path";

const upload = multer({ dest: "uploads/" });

export const uploadCSV = [
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    console.log("File received:", req.file);
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const results: any[] = [];

    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("error", (err) => {
        console.error("Error reading CSV:", err);
        fs.unlinkSync(filePath);
        res.status(500).json({ message: "Error reading CSV file" });
      })
      .on("end", async () => {
        try {
          const chunkSize = 500;
          for (let i = 0; i < results.length; i += chunkSize) {
            const chunk = results.slice(i, i + chunkSize);
            try {
              await players.bulkCreate(chunk, {
                ignoreDuplicates: true,
                validate: true,
              });
            } catch (chunkErr) {
              console.error(
                `Error inserting chunk starting at row ${i}:`,
                chunkErr
              );
              throw chunkErr;
            }
          }
          fs.unlinkSync(filePath);
          res.json({
            message: "CSV data imported successfully",
            count: results.length,
          });
        } catch (error) {
          console.error("Error importing CSV:", error);
          res.status(500).json({ message: "Error importing CSV data" });
        }
      });
  },
];

export const getPlayers = async (req: Request, res: Response) => {
  try {
    // Parse filter parameters

    const name = (req.query.name as string) || "";
    const club = (req.query.club as string) || "";
    const position = (req.query.position as string) || "";
    const where: any = {};
    if (name) {
      const nameTerms = name.trim().split(/\s+/);
      where[Op.and] = nameTerms.map((term) => ({
        long_name: { [Op.like]: `%${term}%` },
      }));
    }
    if (club) where.club_name = { [Op.like]: `%${club}%` }; // Filter by club (partial match)
    if (position) where.player_positions = { [Op.like]: `%${position}%` }; // Filter by position (partial match)

    console.log("Filters applied:", where); // Debug: check the filters

    // Else, apply pagination for regular API response
    const limit = 25; // Default limit to 25
    const pageParam = Array.isArray(req.query.page)
      ? req.query.page[0]
      : req.query.page;
    const page = parseInt(pageParam as string) || 1; // Default to page 1 if not valid
    const offset = (page - 1) * limit;
    const { count, rows: paginatedRows } = await players.findAndCountAll({
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
  } catch {
    res
      .status(500)
      .json({ message: "An error occurred while fetching players." });
  }
};

/* res.json({
    msg: "get Player",
  }); */

export const exportPlayersCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Parse filter parameters
    const name = (req.query.name as string) || "";
    const club = (req.query.club as string) || "";
    const position = (req.query.position as string) || "";
    const where: any = {};
    if (name) where.long_name = { [Op.like]: `%${name}%` };
    if (club) where.club_name = { [Op.like]: `%${club}%` };
    if (position) where.player_positions = { [Op.like]: `%${position}%` };

    console.log("Filters applied for CSV export:", where); // Debug

    // Fetch all matching players without pagination
    const allPlayers = await players.findAll({ where });

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
    const csv = parse(playersData, opts);

    // Set response headers for file download
    const utf8BOM = "\uFEFF";
    res.header("Content-Type", "text/csv; charset=utf-8");
    res.attachment("players.csv");
    res.send(utf8BOM + csv);
    return;
  } catch (error) {
    console.error("Error exporting players to CSV:", error);
    res
      .status(500)
      .json({ message: "An error occurred while exporting players." });
  }
};

export const getPlayer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const player = await players.findByPk(id);

  if (player) {
    res.json(player);
  } else {
    res.status(404).json({
      msg: `no existe un jugador con el id ${id}`,
    });
  }
};

export const postPlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    long_name,
    player_positions,
    club_name,
    nationality_name,
    skill_moves,

    player_face_url,
    pace,
    shooting,
    defending,
    passing,
    dribbling,
    physic,
  } = req.body;

  try {
    console.log("Query parameters:", req.body);
    const skillValues = [pace, shooting, defending, passing, dribbling, physic];
    const overall = Math.round(
      skillValues.reduce((sum, val) => sum + Number(val), 0) /
        skillValues.length
    );
    const newPlayer = await players.create({
      long_name,
      player_positions,
      club_name,
      nationality_name,
      skill_moves,
      player_face_url,
      pace,
      shooting,
      defending,
      passing,
      dribbling,
      physic,
      overall,
    } as playersCreationAttributes);

    res.status(201).json({
      msg: "Player added successfully",
      player: newPlayer,
    });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({
      msg: "An error occurred while adding the player",
    });
  }
};

export const updatePlayer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params; // Extract player ID from URL parameters
  const {
    long_name,
    player_positions,
    club_name,
    nationality_name,
    skill_moves,
    player_face_url,
    pace,
    shooting,
    defending,
    passing,
    dribbling,
    physic,
  } = req.body; // Extract fields from request body

  try {
    // Find the player by ID
    const player = await players.findByPk(id);

    if (!player) {
      // If player not found, send a 404 error
      res.status(404).json({
        msg: `Player with ID ${id} not found`,
      });
    }
    // Calculate overall skill based on provided skills
    const skillValues = [pace, shooting, defending, passing, dribbling, physic];
    const overall = Math.round(
      skillValues.reduce((sum, val) => sum + Number(val), 0) /
        skillValues.length
    );

    // Update the player's data
    await players.update(
      {
        long_name,
        player_positions,
        club_name,
        nationality_name,
        skill_moves,
        player_face_url,
        pace,
        shooting,
        defending,
        passing,
        dribbling,
        physic,
        overall,
      },
      {
        where: { id },
      }
    );

    // Respond with the updated player data
    res.json({
      msg: "Player updated successfully",
      player,
    });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({
      msg: "An error occurred while updating the player",
    });
  }
};

export const getPlayerSkillTimeline = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const skillParam = req.query.skill as string | undefined;

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
  const invalidSkills = requestedSkills.filter(
    (s) => !allowedSkills.includes(s)
  );
  if (invalidSkills.length > 0) {
    res.status(400).json({
      message: `Invalid skill(s) selected: ${invalidSkills.join(", ")}`,
    });
    return;
  }

  try {
    const playerRecord = await players.findByPk(id);
    if (!playerRecord) {
      res.status(404).json({ message: "Player not found" });
      return;
    }

    // Query all records with the player's long_name
    const playerTimelineRecords = await players.findAll({
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
    const result: Record<string, any[]> = {};
    requestedSkills.forEach((skill) => {
      result[skill] = playerTimelineRecords.map((record) => ({
        fifa_version: record.fifa_version,
        fifa_update: record.fifa_update,
        value: record.get(skill),
      }));
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching skill timeline:", error);
    res.status(500).json({
      message: "An error occurred while fetching skill timeline.",
    });
  }
};
