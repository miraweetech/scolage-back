import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const SuperAdmin = sequelize.define("SuperAdmin", {
    super_admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "super_admin_id"
    },
    created_by: {
        type: DataTypes.INTEGER,
        field: "created_by"
    },
    fname: {
        type: DataTypes.STRING,
        field: "fname"
    },
    lname: {
        type: DataTypes.STRING,
        field: "lname"
    },
    user_name: {
        type: DataTypes.STRING,
        unique: true,
        field: "user_name"
    },
    profile_image: {
        type: DataTypes.STRING,
        field: "profile_img"
    },
    is_native: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_native"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active"
    },
    status: {
        type: DataTypes.ENUM("active", "inactive", "suspended"),
        defaultValue: "active",
        field: "status"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at"
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "modified_at"
    },
}, {
    tableName: "super_admins",
    timestamps: false
})

export default SuperAdmin;