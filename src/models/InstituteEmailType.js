import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteEmailType = sequelize.define("InstituteEmailType", {
    institute_email_type_id: {
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
    tableName: "institute_email_type",
    timestamps: false
})

export default InstituteEmailType;