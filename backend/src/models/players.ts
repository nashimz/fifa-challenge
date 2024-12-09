import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface playersAttributes {
  id: number;
  fifa_version: string;
  fifa_update: string;
  player_face_url: string;
  long_name: string;
  player_positions: string;
  club_name?: string;
  nationality_name?: string;
  overall: number;
  potential: number;
  value_eur?: number;
  wage_eur?: number;
  age: number;
  height_cm?: number;
  weight_kg?: number;
  preferred_foot?: string;
  weak_foot?: number;
  skill_moves?: number;
  international_reputation?: number;
  work_rate?: string;
  body_type?: string;
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physic?: number;
  attacking_crossing?: number;
  attacking_finishing?: number;
  attacking_heading_accuracy?: number;
  attacking_short_passing?: number;
  attacking_volleys?: number;
  skill_dribbling?: number;
  skill_curve?: number;
  skill_fk_accuracy?: number;
  skill_long_passing?: number;
  skill_ball_control?: number;
  movement_acceleration?: number;
  movement_sprint_speed?: number;
  movement_agility?: number;
  movement_reactions?: number;
  movement_balance?: number;
  power_shot_power?: number;
  power_jumping?: number;
  power_stamina?: number;
  power_strength?: number;
  power_long_shots?: number;
  mentality_aggression?: number;
  mentality_interceptions?: number;
  mentality_positioning?: number;
  mentality_vision?: number;
  mentality_penalties?: number;
  mentality_composure?: number;
  defending_marking?: number;
  defending_standing_tackle?: number;
  defending_sliding_tackle?: number;
  goalkeeping_diving?: number;
  goalkeeping_handling?: number;
  goalkeeping_kicking?: number;
  goalkeeping_positioning?: number;
  goalkeeping_reflexes?: number;
  goalkeeping_speed?: number;
  player_traits?: string;
}

export type playersPk = "id";
export type playersId = players[playersPk];
export type playersOptionalAttributes =
  | "id"
  | "club_name"
  | "nationality_name"
  | "value_eur"
  | "wage_eur"
  | "height_cm"
  | "weight_kg"
  | "preferred_foot"
  | "weak_foot"
  | "skill_moves"
  | "international_reputation"
  | "work_rate"
  | "body_type"
  | "pace"
  | "shooting"
  | "passing"
  | "dribbling"
  | "defending"
  | "physic"
  | "attacking_crossing"
  | "attacking_finishing"
  | "attacking_heading_accuracy"
  | "attacking_short_passing"
  | "attacking_volleys"
  | "skill_dribbling"
  | "skill_curve"
  | "skill_fk_accuracy"
  | "skill_long_passing"
  | "skill_ball_control"
  | "movement_acceleration"
  | "movement_sprint_speed"
  | "movement_agility"
  | "movement_reactions"
  | "movement_balance"
  | "power_shot_power"
  | "power_jumping"
  | "power_stamina"
  | "power_strength"
  | "power_long_shots"
  | "mentality_aggression"
  | "mentality_interceptions"
  | "mentality_positioning"
  | "mentality_vision"
  | "mentality_penalties"
  | "mentality_composure"
  | "defending_marking"
  | "defending_standing_tackle"
  | "defending_sliding_tackle"
  | "goalkeeping_diving"
  | "goalkeeping_handling"
  | "goalkeeping_kicking"
  | "goalkeeping_positioning"
  | "goalkeeping_reflexes"
  | "goalkeeping_speed"
  | "player_traits";
export type playersCreationAttributes = Optional<
  playersAttributes,
  playersOptionalAttributes
>;

export class players
  extends Model<playersAttributes, playersCreationAttributes>
  implements playersAttributes
{
  id!: number;
  fifa_version!: string;
  fifa_update!: string;
  player_face_url!: string;
  long_name!: string;
  player_positions!: string;
  club_name?: string;
  nationality_name?: string;
  overall!: number;
  potential!: number;
  value_eur?: number;
  wage_eur?: number;
  age!: number;
  height_cm?: number;
  weight_kg?: number;
  preferred_foot?: string;
  weak_foot?: number;
  skill_moves?: number;
  international_reputation?: number;
  work_rate?: string;
  body_type?: string;
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physic?: number;
  attacking_crossing?: number;
  attacking_finishing?: number;
  attacking_heading_accuracy?: number;
  attacking_short_passing?: number;
  attacking_volleys?: number;
  skill_dribbling?: number;
  skill_curve?: number;
  skill_fk_accuracy?: number;
  skill_long_passing?: number;
  skill_ball_control?: number;
  movement_acceleration?: number;
  movement_sprint_speed?: number;
  movement_agility?: number;
  movement_reactions?: number;
  movement_balance?: number;
  power_shot_power?: number;
  power_jumping?: number;
  power_stamina?: number;
  power_strength?: number;
  power_long_shots?: number;
  mentality_aggression?: number;
  mentality_interceptions?: number;
  mentality_positioning?: number;
  mentality_vision?: number;
  mentality_penalties?: number;
  mentality_composure?: number;
  defending_marking?: number;
  defending_standing_tackle?: number;
  defending_sliding_tackle?: number;
  goalkeeping_diving?: number;
  goalkeeping_handling?: number;
  goalkeeping_kicking?: number;
  goalkeeping_positioning?: number;
  goalkeeping_reflexes?: number;
  goalkeeping_speed?: number;
  player_traits?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof players {
    return players.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        fifa_version: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        fifa_update: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        player_face_url: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        long_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        player_positions: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: "",
        },
        club_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        nationality_name: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        overall: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        potential: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        value_eur: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        wage_eur: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        height_cm: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        weight_kg: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        preferred_foot: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        weak_foot: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        skill_moves: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        international_reputation: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        work_rate: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        body_type: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
        pace: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        shooting: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        passing: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        dribbling: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        defending: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        physic: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        attacking_crossing: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        attacking_finishing: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        attacking_heading_accuracy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        attacking_short_passing: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        attacking_volleys: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        skill_dribbling: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        skill_curve: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        skill_fk_accuracy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        skill_long_passing: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        skill_ball_control: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        movement_acceleration: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        movement_sprint_speed: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        movement_agility: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        movement_reactions: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        movement_balance: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        power_shot_power: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        power_jumping: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        power_stamina: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        power_strength: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        power_long_shots: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        mentality_aggression: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        mentality_interceptions: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        mentality_positioning: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        mentality_vision: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        mentality_penalties: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        mentality_composure: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        defending_marking: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        defending_standing_tackle: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        defending_sliding_tackle: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        goalkeeping_diving: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        goalkeeping_handling: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        goalkeeping_kicking: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        goalkeeping_positioning: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        goalkeeping_reflexes: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        goalkeeping_speed: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0,
        },
        player_traits: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: "",
        },
      },
      {
        sequelize,
        tableName: "players",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
