import { DataTypes } from "sequelize";
import { sequelize } from "../configs/connection.js";

const InstituteHighlightsDetails = sequelize.define("InstituteHighlightsDetails", {
    institute_highlights_details_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "highlight_detail_id"
    },
    institute_highlight_id: {
        type: DataTypes.INTEGER,
        field: "highlight_id"
    },
    institute_highlights_type_id: {
        type: DataTypes.INTEGER,
        field: "ins_highlight_id"
    },
    description: {
        type: DataTypes.STRING,
        field: "description"
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
    },
    isselected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "isselected"
    }
}, {
    tableName: "institute_highlights_details",
    timestamps: false
});

export default InstituteHighlightsDetails;
