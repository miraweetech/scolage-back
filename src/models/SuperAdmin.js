import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SuperAdmin = sequelize.define("SuperAdmin", {
    super_admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    fname: {
        type: DataTypes.STRING
    },
    lname: {
        type: DataTypes.STRING
    },
    user_name: {
        type: DataTypes.STRING,
        unique: true
    },
    profile_image: {
        type: DataTypes.STRING
    },
    is_native: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    status: {
        type: DataTypes.ENUM("active", "inactive", "suspended"),
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
    tableName: "super_admins",
    timestamps: false
})

export default SuperAdmin;