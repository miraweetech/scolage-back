import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const StaffManagement = sequelize.define("StaffManagement", {
    staff_management_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "staff_man_id"
    },
    qualification_type_id: {
        type: DataTypes.INTEGER,
        field: "qualification_id"
    },
    designation_type_id: {
        type: DataTypes.INTEGER,
        field: "designation_id"
    },
    institute_staff_management_id: {
        type: DataTypes.INTEGER,
        field: "staff_man_id"
    },
    profile_picture_url: {
        type: DataTypes.STRING,
        field: "picture_url"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
    },
    total_experience_years: {
        type: DataTypes.INTEGER,
        field: "total_exp_year"
    },
    current_experience_years: {
        type: DataTypes.INTEGER,
        field: "current_exp_year"
    },
    about: {
        type: DataTypes.STRING,
        field: "about"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "modified_at",
    },
}, {
    tableName: "staff_management",
    timestamps: false
});

export default StaffManagement;
