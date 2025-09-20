import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteHighlightsType = sequelize.define("InstituteHighlightsType", {
    institute_highlights_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "highlight_type_id"
    },
    created_by: {
        type: DataTypes.STRING,
        field: "created_by"
    },
    name: {
        type: DataTypes.STRING,
        field: "name"
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
    isdisable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdisable"
    },
    isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "isdeleted"
    }
}, {
    tableName: "institute_highlights_type",
    timestamps: false
})
export default InstituteHighlightsType