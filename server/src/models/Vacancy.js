import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";
import { ActiveStatus, RecruitementType } from "../constant/common.js";

class Vacancy extends Model {}

Vacancy.init(
  {
    VacancyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    VacancyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RecruitmentType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        RecruitementType.Internal,
        RecruitementType.External,
        RecruitementType.Internal_External,
        RecruitementType.Promotion,
      ],
    },
    SalaryGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BoardGradeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AdvertismentPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PublishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ClosingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    PlannedInterViewDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    AgeLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [ActiveStatus.Open, ActiveStatus.Close],
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Vacancies",
  }
);

export default Vacancy;
