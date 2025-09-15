import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../configs/connection.js";

const StaffManagement = sequelize.define("StaffManagement", {
    staff_management_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qualification_type_id: {
        type: DataTypes.INTEGER
    },
    designation_type_id: {
        type: DataTypes.INTEGER
    },
    institute_staff_management_id: {
        type: DataTypes.INTEGER
    },
    profile_picture_url: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    total_experience_years: {
        type: DataTypes.INTEGER
    },
    current_experience_years: {
        type: DataTypes.INTEGER
    },
    about: {
        type: DataTypes.STRING
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: "staff_management",
    timestamps: false
});

export default StaffManagement;
