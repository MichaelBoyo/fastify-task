import { Sequelize, DataTypes, Model } from "sequelize";

// Initialize Sequelize
export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database: "fastify_task",
  username: "username",
  password: "password",
});

// Facility Model
export interface FacilityAttributes {
  facility_id: number;
  facility_name: string;
}
export class Facility
  extends Model<FacilityAttributes>
  implements FacilityAttributes
{
  facility_id!: number;
  facility_name!: string;
}
Facility.init(
  {
    facility_id: { type: DataTypes.INTEGER, primaryKey: true },
    facility_name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "facilities" }
);

export interface ShiftAttributes {
  shift_id: number;
  facility_id: number;
  shift_date: string;
  start_time: string;
  end_time: string;
}
export class Shift extends Model<ShiftAttributes> implements ShiftAttributes {
  shift_id!: number;
  facility_id!: number;
  shift_date!: string;
  start_time!: string;
  end_time!: string;
}
Shift.init(
  {
    shift_id: { type: DataTypes.INTEGER, primaryKey: true },
    facility_id: { type: DataTypes.INTEGER, allowNull: false },
    shift_date: { type: DataTypes.DATEONLY, allowNull: false },
    start_time: { type: DataTypes.TIME, allowNull: false },
    end_time: { type: DataTypes.TIME, allowNull: false },
  },
  { sequelize, modelName: "shifts" }
);

// Associations
Facility.hasMany(Shift, { foreignKey: "facility_id" });
Shift.belongsTo(Facility, { foreignKey: "facility_id" });
