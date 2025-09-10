import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteHighlightsDetails = sequelize.define("InstituteHighlightsDetails", {
    institute_highlights_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institute_id: {
        type: DataTypes.INTEGER
    },
    institute_highlights_type_id: {
        type: DataTypes.INTEGER
    },
    description: {
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
    },
    isselected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "institute_highlights_details",
    timestamps: true
});

export default InstituteHighlightsDetails;
