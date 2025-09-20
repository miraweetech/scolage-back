import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstitutePhoneType = sequelize.define("InstitutePhoneType", {
    institute_phone_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "phone_type_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    title: {
        type: DataTypes.STRING,
        field: "title"
    },
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
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
    }
}, {
    tableName: "institute_phone_type",
    timestamps: false
})

export default InstitutePhoneType;
