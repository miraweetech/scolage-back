import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteAdmin = sequelize.define("InstituteAdmin", {
    institute_admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "institute_admin_id"
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "fname"
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "lname"
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "user_name"
    },
    institute_work_id: {
        type: DataTypes.INTEGER,
        field: "ins_work_id"
    },
    dob: {
        type: DataTypes.DATE,
        field: "dob"
    },
    is_native: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_native"
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "profile_img"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "is_active"
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active",
        field: "status"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "cre_at"
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "modi_at"
    },
}, {
    tableName: "institutes_admins",
    timestamps: false
})

export default InstituteAdmin