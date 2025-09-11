import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstitutePhone = sequelize.define("InstitutePhone", {
    institute_phone_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
    tableName: "institute_phone",
    timestamps: true
});

export default InstitutePhone;
