import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteAdmin = sequelize.define("InstituteAdmin", {
    institute_admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institute_work_id: {
        type: DataTypes.INTEGER,
    },
    dob: {
        type: DataTypes.DATE,
    },
    is_native: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active"
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
    tableName: "institutes_admins",
    timestamps: false
})

export default InstituteAdmin