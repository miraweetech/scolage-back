import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstitutePhoneType = sequelize.define("InstitutePhoneType", {
    institute_phone_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_by: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
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
    }
}, {
    tableName: "institute_phone_type",
    timestamps: false
})

export default InstitutePhoneType;
