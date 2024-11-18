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

// Initialize Database with Seed Data
export const initializeDatabase = async () => {
  await sequelize.sync();

  // Seed facilities
  const facilities = [
    { facility_id: 100, facility_name: "Facility A" },
    { facility_id: 101, facility_name: "Facility B" },
    { facility_id: 102, facility_name: "Facility C" },
  ];
  for (const facility of facilities) {
    await Facility.findOrCreate({
      where: { facility_id: facility.facility_id },
      defaults: facility,
    });
  }

  // Seed shifts
  const shifts = [
    {
      shift_id: 1,
      facility_id: 100,
      shift_date: "2022-10-01",
      start_time: "07:00:00",
      end_time: "15:00:00",
    },
    {
      shift_id: 2,
      facility_id: 100,
      shift_date: "2022-10-01",
      start_time: "15:00:00",
      end_time: "23:00:00",
    },
    {
      shift_id: 3,
      facility_id: 100,
      shift_date: "2022-10-03",
      start_time: "07:00:00",
      end_time: "19:00:00",
    },
    {
      shift_id: 4,
      facility_id: 102,
      shift_date: "2022-10-02",
      start_time: "23:00:00",
      end_time: "07:30:00",
    },
  ];
  for (const shift of shifts) {
    await Shift.findOrCreate({
      where: { shift_id: shift.shift_id },
      defaults: shift,
    });
  }

  console.log("Database initialized with seed data!");
};
