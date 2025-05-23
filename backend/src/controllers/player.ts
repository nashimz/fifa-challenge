import { NextFunction, Request, Response } from "express";
import { players, playersCreationAttributes } from "../models/players";
import { Op, ValidationError } from "sequelize";
import { parse } from "json2csv"; //

export const getPlayers = async (req: Request, res: Response) => {
  try {
    // Parse filter parameters
    const name = (req.query.name as string) || "";
    const club = (req.query.club as string) || "";
    const position = (req.query.position as string) || "";
    const where: any = {};
    if (name) where.long_name = { [Op.like]: `%${name}%` }; // Filter by name (partial match)
    if (club) where.club_name = { [Op.like]: `%${club}%` }; // Filter by club (partial match)
    if (position) where.player_positions = { [Op.like]: `%${position}%` }; // Filter by position (partial match)

    console.log("Filters applied:", where); // Debug: check the filters

    // Else, apply pagination for regular API response
    const limit = 25; // Default limit to 15
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

export const deletePlayer = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: "delete Player",
    id: id,
  });
};

export const postPlayer = async (req: Request, res: Response) => {
  const {
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

    // other optional attributes can go here if they are provided
  } = req.body;

  try {
    // Create a new player in the database
    const newPlayer = await players.create(
      {
        long_name,
        player_positions,
        club_name, // Optional
        nationality_name, // Optional
        overall,
        skill_moves,
        player_face_url,
        shooting,
        defending,
        passing,
        dribbling,
        physic,
        pace, // Optional
        // Add any other optional attributes here if needed
      } as playersCreationAttributes // Explicitly cast to the correct type
    );

    // Respond with the newly created player
    return res.status(201).json({
      msg: "Player added successfully",
      player: newPlayer,
    });
  } catch (error) {
    console.error("Error adding player:", error);
    return res.status(500).json({
      msg: "An error occurred while addding the player",
    });
  }
};

export const updatePlayer = async (req: Request, res: Response) => {
  const { id } = req.params; // Extract player ID from URL parameters
  const {
    long_name,
    player_positions,
    club_name,
    overall,
    nationality_name,
    skill_moves,
  } = req.body; // Extract fields from request body

  try {
    // Find the player by ID
    const player = await players.findByPk(id);

    if (!player) {
      // If player not found, send a 404 error
      return res.status(404).json({
        msg: `Player with ID ${id} not found`,
      });
    }

    // Update the player's data
    await players.update(
      {
        long_name,
        player_positions,
        club_name,
        overall,
        nationality_name,
        skill_moves,
      },
      {
        where: { id },
      }
    );

    // Respond with the updated player data
    return res.json({
      msg: "Player updated successfully",
      player,
    });
  } catch (error) {
    console.error("Error updating player:", error);
    return res.status(500).json({
      msg: "An error occurred while updating the player",
    });
  }
};
